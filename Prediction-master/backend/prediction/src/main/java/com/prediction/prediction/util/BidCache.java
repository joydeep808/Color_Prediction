package com.prediction.prediction.util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import com.prediction.prediction.entity.Prediction;
import com.prediction.prediction.repository.PredictionRepo;

import lombok.Data;

@Data
@Component
public class BidCache {
  private final PredictionRepo predictionRepo;
  private Prediction currentPrediction;
  private List<Prediction> pastPredictions;

  public BidCache(PredictionRepo predictionRepo) {
    this.predictionRepo = predictionRepo;
    this.pastPredictions = new ArrayList<>();
    this.currentPrediction = new Prediction();  // Initialize currentPrediction properly
    this.pastPredictions.add(currentPrediction); // Add the initial prediction
  }

  public synchronized boolean addPrediction(Prediction prediction) {
    if (prediction != null) {
      currentPrediction.setId(prediction.getId());
      currentPrediction.setEndTime(prediction.getEndTime());
      currentPrediction.setStartTime(prediction.getStartTime());
      currentPrediction.setStatus(prediction.getStatus());
      return true;
    }
    return false;
  }

  public Prediction getCurrentPrediction() {
    if (currentPrediction == null || currentPrediction.getId() == null) {
      Prediction latestPrediction = predictionRepo.getLatestPrediction();
      addPrediction(latestPrediction); // Add the latest prediction if currentPrediction is missing
    }
    return currentPrediction; // Return the current prediction
  }

  public List<Prediction> getPreviousPredictions() {
    if (pastPredictions.isEmpty()) {
      Pageable pageable = PageRequest.of(0, 20);
      Page<Prediction> predictions = predictionRepo.getPredictionsForBidCache(pageable);
      setPastPredictions(predictions.isEmpty() ? List.of() : predictions.getContent());
    }
    Collections.reverse(pastPredictions); // Reverse the list properly
    return pastPredictions.isEmpty() ? List.of() : pastPredictions;
  }

  public void setPastPredictions(List<Prediction> predictions) {
    this.pastPredictions = predictions;
  }

 
  public boolean setPastPrediction(Prediction prediction , Boolean isUpdate) {
    if (isUpdate) {
      pastPredictions.set(0, prediction);
      return true;
    }
    if (prediction != null) {
      pastPredictions.add(prediction);
      if (pastPredictions.size() > 20) {
        pastPredictions = pastPredictions.subList(pastPredictions.size() - 20, pastPredictions.size());
      }
      return true;
    }
    return false;
  }


  public boolean isUserAbleToBid(){
    return (this.currentPrediction.getEndTime().longValue() - System.currentTimeMillis()) / 1000  > 5 ? true : false;
  }

}
