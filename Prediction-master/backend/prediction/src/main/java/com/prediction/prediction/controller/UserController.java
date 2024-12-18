package com.prediction.prediction.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.prediction.prediction.annotation.AuthForUser;
import com.prediction.prediction.dto.AuthTokenDto;
import com.prediction.prediction.dto.UserLoginDto;
import com.prediction.prediction.entity.User;
import com.prediction.prediction.entity.UserBalance;
import com.prediction.prediction.service.UserService;
import com.prediction.prediction.util.Response;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {
  private final UserService userService;


  @PostMapping("/create")
  public ResponseEntity<Response<Void>> createUser(@RequestBody @Valid User user) throws Exception{
    return userService.createUser(user);
  }
  @PostMapping("/login")
  public ResponseEntity<Response<AuthTokenDto>> loginUser(@RequestBody  UserLoginDto loginDto , HttpServletResponse response) throws Exception{
    return userService.loginUser(loginDto, response);
  }

  @GetMapping("/refreshToken/{token}")
  public ResponseEntity<Response<String>> getNewAccessToken(@PathVariable String token){
    return userService.getAccessTokenFromRefreshToken(token);
  }
  @GetMapping("/balance")
  @AuthForUser
  public ResponseEntity<Response<UserBalance>> getUserBalance(HttpServletRequest request) throws Exception{
    return userService.getUserBalance(request);
  }

  @AuthForUser
  @GetMapping("/private")
  public String privateUser(HttpServletRequest request , HttpServletResponse response) throws Exception{

    request.getHeader("cookie");
    
    return "You are authorized";
  }

}
