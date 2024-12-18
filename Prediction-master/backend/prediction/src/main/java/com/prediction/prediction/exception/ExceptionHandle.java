package com.prediction.prediction.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.prediction.prediction.util.Response;

import jakarta.persistence.OptimisticLockException;
import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class ExceptionHandle {
  
  @ExceptionHandler(MainException.class)
  public ResponseEntity<Response<Void>> handleMainException(MainException ex){
    return new Response<Void>().sendErrorResponse(ex.getStatusCode(), ex.getMessage()).sendResponse();
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Response<Void>> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex){
    return new Response<Void>().sendErrorResponse(400, ex.getMessage()).sendResponse();
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<Response<Void>> handleConstraintViolationException(ConstraintViolationException ex){
    return new Response<Void>().sendErrorResponse(400, ex.getConstraintViolations().stream().map(e->e.getMessage()).toList().toString()).sendResponse();
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<Response<Void>> handleException(Exception ex){
    return new Response<Void>().sendErrorResponse(400, ex.getMessage()).sendResponse();
  }
  @ExceptionHandler(OptimisticLockException.class)
  public ResponseEntity<Response<Void>> handleExceptionConstrantViolance(OptimisticLockException exception){
      return new Response<Void>().sendErrorResponse(400, "Please try again there might be some error").sendResponse();
  }
}
