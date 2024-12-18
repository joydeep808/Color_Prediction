package com.prediction.prediction.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Version;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserBalance {
  @NotNull(message = "User id is required")
  @Id
  private Long userId;
  private Double balance;
  @Version
  private Long version;

  public UserBalance(Long userId , Double balance){
    this.userId = userId;
    this.balance =balance;
    
  }

}
