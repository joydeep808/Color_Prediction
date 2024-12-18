package com.prediction.prediction.entity;


import jakarta.persistence.*;
import lombok.*;
@Entity
@AllArgsConstructor
@Builder
@Data
public class Prediction {
  @Id
  private Long id;
  private Integer number;
  private Long startTime;
  private Long endTime;
  
  private String status;
  public Prediction(){
    this.id = System.currentTimeMillis();
    this.status = "OPEN";
  }
  public Prediction(Long startTime , Long endTime){
    this.endTime = endTime;
    this.startTime = startTime;
    this.id = System.currentTimeMillis();
    this.status = "OPEN";
  }

}
