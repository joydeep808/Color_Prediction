package com.prediction.prediction.scheduler;

import java.time.Instant;
import java.util.Random;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.prediction.prediction.dto.bid.BidUpdateDto;
import com.prediction.prediction.entity.Prediction;
import com.prediction.prediction.rabbitmq.MessageSender;
import com.prediction.prediction.service.PredictionService;
import com.prediction.prediction.util.BidCache;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class Scheduler {
  private final PredictionService predictionService;
  private final BidCache bidCache;
  // private Prediction newPrediction = new Prediction();
  private final MessageSender messageSender;
  private final ObjectMapper objectMapper;

  // i have to run this in every 30s
  // This is a scheduled function that Spring will run at a fixed rate
  // (in this case, every 25 seconds). This is used to create a new
  // prediction entity every 30 seconds.
  @Scheduled(fixedRate = 50000)
  public Boolean run() throws JsonProcessingException {
    
    // i have to create a new Prediction
    // This line retrieves the latest open prediction from the database.
    // If there is no open prediction, the function will create a new one.
    Prediction prediction = predictionService.getOpenPrediction();

    
    Integer number = new Random().nextInt(8) + 1;
    if (prediction != null && prediction.getId() != null) {
      // This checks if a prediction was found in the previous line.
      // If one was found, it will create a new prediction and save it to the
      // database. The existing prediction will have its number updated
      // to a random number between 1 and 9.
      messageSender.sendMessageToQueue(objectMapper.writeValueAsString(new BidUpdateDto(prediction.getId(), number)));
      predictionService.updateOpenPrediction(prediction, number);

      return createNewBid(number);
    }
    return  createNewBid(number);

  }

  public Boolean createNewBid(Integer number) {
    // This function creates a new Prediction entity. It calculates the
    // start and end times for the prediction, and then creates a new
    // Prediction with the given start and end times. The new
    // Prediction entity is then saved to the database using the
    // createPrediction method.
    //
    // The start time is the current time, and the end time is the
    // current time plus 30 seconds.
    Instant currentTime = Instant.now();
    Long startTime = currentTime.toEpochMilli();
    Long endTime = currentTime.plusSeconds(50).toEpochMilli();

    // This line creates a new Prediction entity with the calculated
    // start and end times.
    Prediction newPrediction = new Prediction(startTime, endTime);
    // This line saves the new Prediction to the database using the
    // createPrediction method.
    predictionService.createPrediction(newPrediction);
    Prediction currentPrediction = bidCache.getCurrentPrediction();;
    currentPrediction.setNumber(number);
    currentPrediction.setStatus("CLOSED");
    bidCache.setPastPrediction(currentPrediction , true);
    bidCache.addPrediction(newPrediction);
    bidCache.setPastPrediction(newPrediction , false);

    // This line returns true to indicate that the Prediction was
    // successfully created and saved.
    
    return true;
  }

  // @Scheduled(fixedRate = 30000)
  // public void run2() {
  //   
  // }
}
// the scheduler will run every 25 sec
// and the expiry will heppen in every 30s
// 