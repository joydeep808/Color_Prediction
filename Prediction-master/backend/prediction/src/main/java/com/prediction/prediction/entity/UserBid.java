package com.prediction.prediction.entity;

import java.time.ZonedDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserBid {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;
  @NotNull(message = "User id is required")
  @Positive(message ="User id is required")
  private Long userId;
  private Long predictionId;
  @NotNull(message = "Amount is required")
  @Positive(message = "Amount should be lesser than 0")
  @Min(value = 10, message = "Amount should be greater than 10")
  private Integer amount;
  private Integer number =  0;
  

  @Enumerated(EnumType.STRING)
  private Status status;
  @Enumerated(EnumType.STRING)
  private ColorType colorType ;


  public enum ColorType {
    RED,
    GREEN,
    VIOLET,
    NONE
  }
  
  public enum Status {
    PENDING,
    WIN,
    LOOSE
  }
  private Long createdAt;
  public UserBid(Long user , Long predictionId , Integer amount , ColorType colorType) {
    this.userId = user;
    this.amount = amount;
    this.predictionId = predictionId;
    this.createdAt = ZonedDateTime.now().toInstant().toEpochMilli();
    this.number = 0;
    this.colorType = colorType;
    this.status = Status.PENDING;

  }
  public UserBid(Long user , Long predictionId , Integer amount , Integer number) {
    
    this.userId = user;
    this.amount = amount;
    this.predictionId = predictionId;
    this.createdAt = ZonedDateTime.now().toInstant().toEpochMilli();
    this.number = number;
    this.colorType = ColorType.NONE;
    this.status = Status.PENDING;


  }
  




  // whenever user creates a new prediction after that when the server sends the
  // request to the user
  // in the frontend the state will be there and i have to check whether the
  // privious bid is correct or not if correct
  // then based on the price that the user bid i have to add the commition to user
  // account
  // to handle the type of request i can make use of rabbitmq to handle the
  // requests
  /**
   * whenever the time limit is done than i have to check whether the user has won
   * or not
   * if the user wins than i have to add the amount to the user account
   * and if the user looses than i have to debit the commition to the user account
   * 
   */

   

}
