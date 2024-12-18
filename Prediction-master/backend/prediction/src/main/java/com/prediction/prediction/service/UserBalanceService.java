package com.prediction.prediction.service;

import org.springframework.stereotype.Service;

import com.prediction.prediction.entity.UserBalance;
import com.prediction.prediction.repository.UserBalancRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserBalanceService {
  public final UserBalancRepo userBalancRepo;  

  public Boolean saveUserBalance(UserBalance userBalance) {
    userBalancRepo.save(userBalance);
    return true;
  }



}
