package com.prediction.prediction.exception.thrown_exception;
import com.prediction.prediction.exception.MainException;

public class PredictionNotFound extends MainException{
  public PredictionNotFound(Integer statusCode , String message ){
    super(message, statusCode);
  }
}
