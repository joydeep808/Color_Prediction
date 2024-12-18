package com.prediction.prediction.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prediction.prediction.entity.UserBalance;
import com.prediction.prediction.service.UserBalanceService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user-balance")
public class UserBalanceController {
  
  private final UserBalanceService userBalanceService;
  

  @PostMapping("/create")
  public Boolean userBalanceCreate(@RequestBody UserBalance userBalance) {
    return userBalanceService.saveUserBalance(userBalance);
    
  }
}
