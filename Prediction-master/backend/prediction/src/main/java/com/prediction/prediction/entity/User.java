package com.prediction.prediction.entity;

import java.time.ZonedDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;  
  private String nickName;
  private Long lastLogin;
  @NotNull(message = "Email is required")
  private String email;
  @NotNull(message="Password is required")
  private String password;

  private String role ;
  
  private Long createdAt;
  private Long updatedAt;
  
  public User(){
    this.createdAt = ZonedDateTime.now().toInstant().toEpochMilli();
    this.updatedAt = ZonedDateTime.now().toInstant().toEpochMilli();
  }

}
