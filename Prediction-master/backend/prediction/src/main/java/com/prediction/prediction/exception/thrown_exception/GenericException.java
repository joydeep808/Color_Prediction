package com.prediction.prediction.exception.thrown_exception;

import com.prediction.prediction.exception.MainException;

public class GenericException extends MainException{
  public GenericException(Integer statusCode , String message){
    super(message, statusCode);
  }
}
