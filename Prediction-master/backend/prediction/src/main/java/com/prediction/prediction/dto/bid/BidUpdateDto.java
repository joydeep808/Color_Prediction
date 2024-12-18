package com.prediction.prediction.dto.bid;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BidUpdateDto {
  private Long currentPredictionId;
  private Integer number;
}
