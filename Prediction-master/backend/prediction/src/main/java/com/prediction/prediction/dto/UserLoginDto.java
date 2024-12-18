package com.prediction.prediction.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginDto {
  @NotNull(message = "Email is required")
  @Email( message = "Please enter a valid email")
  private String email;
  @NotNull(message = "Please enter your password")
  private String password;

}
