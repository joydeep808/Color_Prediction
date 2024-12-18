package com.prediction.prediction.exception.thrown_exception;

import com.prediction.prediction.exception.MainException;

public class NotFoundException extends MainException {
  public NotFoundException(Integer statusCode , String message){
    super(message, statusCode);
  }
}
