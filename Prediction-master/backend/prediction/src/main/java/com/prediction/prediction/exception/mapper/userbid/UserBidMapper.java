package com.prediction.prediction.exception.mapper.userbid;

public interface UserBidMapper {
  String getId();
  Long getPredictionId();
  Integer getAmount();
  String getStatus();
  Long getCreatedAt();
  Integer getNumber();
  String getColorType();
}
