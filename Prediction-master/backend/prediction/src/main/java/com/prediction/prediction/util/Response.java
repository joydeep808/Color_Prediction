package com.prediction.prediction.util;


import org.springframework.http.ResponseEntity;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Response<T> {
  
  private String message;
  private T data;
  private Integer statusCode;
  private Boolean isSuccess;

  public Response<T> sendSuccessResponse(Integer statusCode , String message ){
    this.message = message;
    this.isSuccess = true;
    this.statusCode = statusCode;
    return this;
  }

  public Response<T> sendSuccessResponse(Integer statusCode , String message , T data ){
    this.message = message;
    this.isSuccess = true;
    this.data = data;
    this.statusCode = statusCode;
    return this;
  }

  public Response<T> sendErrorResponse(Integer statusCode , String message ){
    this.message = message;
    this.isSuccess = false;
    this.statusCode = statusCode;
    return this;
  }
  public ResponseEntity<Response<T>> sendResponse(){
    return ResponseEntity.status(this.statusCode).body(this);
  }

}
