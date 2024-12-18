package com.prediction.prediction.entity;

import java.time.ZonedDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
public class UserTransection {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @NotNull(message = "user id is required")
  private Long userId;
  @Positive(message = "Amount should be greater than 0")
  private Integer amount;


  private String transectionId;

  @Enumerated(EnumType.STRING)
  private Type type;
  @Enumerated(EnumType.STRING)
  private Status status;
  
  public enum Type {
    DEPOSIT , WITHDRAW
  }
  public enum Status{
    PENDING , SUCCESS , FAILED
  }

  private Long createdAt;
  private Long updatedAt;

  public UserTransection(){
    this.createdAt = ZonedDateTime.now().toInstant().toEpochMilli();
    this.updatedAt = ZonedDateTime.now().toInstant().toEpochMilli();
  }


}
