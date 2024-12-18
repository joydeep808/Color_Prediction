package com.prediction.prediction.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
public class UserStatistics {
  @Id
  private Long userId;  // Foreign key to User
  private Integer total_predictions;
  private Integer correct_predictions;
  private Integer incorrect_predictions;
  private Integer score;
  private Integer rank;
}
