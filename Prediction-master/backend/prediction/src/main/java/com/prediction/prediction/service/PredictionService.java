package com.prediction.prediction.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.prediction.prediction.entity.Prediction;
import com.prediction.prediction.exception.mapper.prediction.PredictionMapper;
import com.prediction.prediction.exception.thrown_exception.NotFoundException;
import com.prediction.prediction.repository.PredictionRepo;
import com.prediction.prediction.util.BidCache;
import com.prediction.prediction.util.Response;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PredictionService {
  
  private final PredictionRepo predictionRepo;
  private final BidCache bidCache;
 
  public Boolean createPrediction(Prediction prediction) {
    // Save the prediction entity to the prediction repository
     predictionRepo.save(prediction);
    // Return a successful response with the saved prediction entity
    return true;
  }

  
  public ResponseEntity<Response<Prediction>> updatePrediction(Long id ,Integer number ) throws Exception {

    // Find the prediction entity with the given id from the prediction repository
    Prediction prediction = predictionRepo.findById(id).orElse(null);

    // If the prediction entity is not found, throw a not found exception
    if (prediction == null) throw new NotFoundException(404, "Prediction not found");

    // Update the number of the prediction entity
    prediction.setNumber(number);

    // Save the updated prediction entity to the prediction repository
    Prediction updatedPrediction = predictionRepo.save(prediction);

    // Return a successful response with the updated prediction entity
    return new Response<Prediction>()
      .sendSuccessResponse(200, "Prediction updated successfully", updatedPrediction)
      .sendResponse();

  }

  /**
   * This method retrieves a list of all predictions from the prediction repository.
   * It takes an integer parameter "page" which is used to create a Pageable object.
   * The Pageable object is used to specify the page size and the sort order.
   * The method returns a ResponseEntity containing a list of PredictionMapper objects.
   * If no predictions are found, the method throws a NotFoundException.
   */
  public ResponseEntity<Response<List<PredictionMapper>>> getPredictions(Integer page , Integer size) throws NotFoundException{
    if (size == null ) {
      size = 10;
    }
    // Create a Pageable object with the given page number and a page size of 10.
    // The sort order is set to descending by startTime.
    Pageable pageable = PageRequest.of(page <=0 ? 0 : page -1   , 10);

    // Retrieve the list of predictions from the prediction repository using the Pageable object.
    Page<PredictionMapper> predictions = predictionRepo.getPredictions(pageable);;

    // If no predictions are found, throw a NotFoundException.
    if (predictions.isEmpty())   throw new NotFoundException(404, "No predictions found");

    // Return a successful response with the list of predictions.
    return new Response<List<PredictionMapper>>().sendSuccessResponse(200, "Predictions found successfully", predictions.getContent()).sendResponse();
  }

  public Prediction getOpenPrediction()  {
    // Find the prediction entity with the given id from the prediction repository.
    Prediction prediction = predictionRepo.getLatestPrediction();
    return prediction == null ? null : prediction;
  }
  public Boolean updateOpenPrediction(Prediction prediction , Integer number){
    prediction.setNumber(number);
    prediction.setStatus("CLOSED");
    predictionRepo.save(prediction);
    return true;
  }


  public ResponseEntity<Response<List<Prediction>>> getCurrentPredictions(){
    List<Prediction> subList = bidCache.getPreviousPredictions().subList(0, 2);;
    return new Response<List<Prediction>>().sendSuccessResponse(200, "Successfully found" , subList).sendResponse();
  }
  

}
