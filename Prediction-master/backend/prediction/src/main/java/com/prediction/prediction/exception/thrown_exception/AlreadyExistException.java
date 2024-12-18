package com.prediction.prediction.exception.thrown_exception;

import com.prediction.prediction.exception.MainException;

public class AlreadyExistException  extends MainException{
  public AlreadyExistException(Integer statusCode  , String message){
    super(message, statusCode);
  }
}
