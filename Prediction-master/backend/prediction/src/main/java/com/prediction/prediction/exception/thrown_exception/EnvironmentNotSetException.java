package com.prediction.prediction.exception.thrown_exception;

import com.prediction.prediction.exception.MainException;

public class EnvironmentNotSetException  extends MainException{
  public EnvironmentNotSetException(Integer statusCode , String message){
    super(message, statusCode);
  }
}
