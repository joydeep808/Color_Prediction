package com.prediction.prediction.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@AllArgsConstructor
@Data
public class UserExtraInfo {
  @Id
  private Long userId;
  private String token;

  private Long expiry;
  private Boolean isUserParmanentBlocked;
  private Boolean isUserTemporaryBlocked;
  private Long temporaryBlockedExpiry;

  public UserExtraInfo(){
    this.isUserParmanentBlocked= false;
    this.isUserTemporaryBlocked = false;
    this.temporaryBlockedExpiry = System.currentTimeMillis();
  }
  public UserExtraInfo(Long userId ,String token , Long expiry ){
    this.expiry = expiry;
    this.userId = userId;
    this.token =token;
    this.isUserParmanentBlocked= false;
    this.isUserTemporaryBlocked = false;
    this.temporaryBlockedExpiry = System.currentTimeMillis();
  }
}
