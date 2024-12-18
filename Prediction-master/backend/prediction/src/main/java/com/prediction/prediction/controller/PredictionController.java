package com.prediction.prediction.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.prediction.prediction.entity.Prediction;
import com.prediction.prediction.exception.mapper.prediction.PredictionMapper;
import com.prediction.prediction.service.PredictionService;
import com.prediction.prediction.util.Response;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/prediction")
public class PredictionController {
  private final PredictionService predictionService;

  @GetMapping("/get/{page}")
  public ResponseEntity<Response<List<PredictionMapper>>> getAllPredictions(@PathVariable Integer page , @RequestParam("size") Integer size) throws Exception{
    return predictionService.getPredictions(page , size);
  }
  @GetMapping("/get/pastAndNew")
  public ResponseEntity<Response<List<Prediction>>> getPastAndNewPredictions(){
    return predictionService.getCurrentPredictions();
  }

  
}
