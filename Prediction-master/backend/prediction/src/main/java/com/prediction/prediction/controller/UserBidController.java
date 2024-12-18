package com.prediction.prediction.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prediction.prediction.annotation.AuthForUser;
import com.prediction.prediction.dto.bid.UserBidCreateDto;
import com.prediction.prediction.exception.mapper.userbid.UserBidMapper;
import com.prediction.prediction.service.UserBidService;
import com.prediction.prediction.util.Response;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/user/bid")
public class UserBidController {
  private final UserBidService userBidService;
  

  // @AuthForUser
  @PostMapping("/create")
  @AuthForUser
  public ResponseEntity<Response<Boolean>> createBid(HttpServletRequest request , @RequestBody UserBidCreateDto userBidCreateDto) throws Exception{
    return userBidService.createBid(request, userBidCreateDto);
  }
  @AuthForUser
  @GetMapping("/get/{page}")
  public ResponseEntity<Response<List<UserBidMapper>>> getUserBids(HttpServletRequest request , @PathVariable Integer page) throws Exception{
    return userBidService.getUserAllBids(request, page);
  }
}
