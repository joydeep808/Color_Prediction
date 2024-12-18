package com.prediction.prediction.exception.thrown_exception;

import com.prediction.prediction.exception.MainException;

public class BidClosedException  extends MainException{
  public BidClosedException(Integer statsCode , String message){
    super(message, statsCode);
  }
  
}
