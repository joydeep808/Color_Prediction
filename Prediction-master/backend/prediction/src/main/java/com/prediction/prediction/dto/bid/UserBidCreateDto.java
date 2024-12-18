package com.prediction.prediction.dto.bid;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserBidCreateDto {
  private Integer amount;
  private Integer number;
  private String color;
  public UserBidCreateDto(){
    this.number = 0;
    this.color = "";
  }


}
