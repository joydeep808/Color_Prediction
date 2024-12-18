package com.prediction.prediction.exception.mapper.jwt;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JwtMapper {
  private Long id;
  private String email;
  private String role;
}
