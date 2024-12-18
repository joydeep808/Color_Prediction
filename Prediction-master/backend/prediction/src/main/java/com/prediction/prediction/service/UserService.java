package com.prediction.prediction.service;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.prediction.prediction.config.auth.*;
import com.prediction.prediction.dto.AuthTokenDto;
import com.prediction.prediction.dto.UserLoginDto;
import com.prediction.prediction.entity.*;
import com.prediction.prediction.exception.thrown_exception.*;
import com.prediction.prediction.repository.*;
import com.prediction.prediction.util.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
  private final UserRepo userRepo;
  private final UserExtraInfoRepo userExtraInfoRepo;
  private final JwtService jwtService;
  private final BCryptPasswordEncoder passwordEncoder;
  private final UserBalancRepo userBalancRepo;

  public ResponseEntity<Response<Void>> createUser(User user) throws Exception {
    String foundUser = userRepo.isEmailAlreadyExist(user.getEmail()).orElse(null);
    if (foundUser != null) {
      throw new AlreadyExistException(400, "Email already exist");
    }
    user.setNickName(UUID.randomUUID().toString());
    user.setPassword(passwordEncoder.encode(user.getPassword()));
   user.setRole(user.getRole() == null ?"USER," :user.getRole()) ;
    userRepo.save(user);
    return new Response<Void>().sendSuccessResponse(201, "User created successfully done!").sendResponse();
  }

  public ResponseEntity<Response<AuthTokenDto>> loginUser(UserLoginDto userLoginDto , HttpServletResponse response) throws Exception{
    User foundUser = userRepo.findByEmail(userLoginDto.getEmail()).orElse(null);
    if (foundUser == null) throw new NotFoundException(404, "User not found with this email");
    boolean passwordMatches = passwordEncoder.matches(userLoginDto.getPassword() , foundUser.getPassword());;
    if (!passwordMatches) throw new GenericException(400, "Incorrect password");

    String accessToken = jwtService.generateAccessToken(foundUser);
    String refreshToken = jwtService.generateRefreshToken();
    
    UserExtraInfo foundUserExtraInfo = userExtraInfoRepo.findById(foundUser.getId()).orElse(null);
    foundUser.setLastLogin(System.currentTimeMillis());
    if (foundUserExtraInfo == null) {
     UserExtraInfo newUserExtraInfo =  new UserExtraInfo(foundUser.getId() , refreshToken ,System.currentTimeMillis() + jwtService.getRefreshTokenExpiryTime() );
     userExtraInfoRepo.save(newUserExtraInfo);
    }
    else{
      foundUserExtraInfo.setToken(refreshToken);
      foundUserExtraInfo.setExpiry(System.currentTimeMillis() + jwtService.getRefreshTokenExpiryTime());
      userExtraInfoRepo.save(foundUserExtraInfo);
    }
    userRepo.save(foundUser);
    AuthTokenDto authTokenDto = new AuthTokenDto(accessToken, refreshToken);
    return new Response<AuthTokenDto>().sendSuccessResponse(200, "Login succesfully done!" , authTokenDto).sendResponse();
  }


  public ResponseEntity<Response<String>> getAccessTokenFromRefreshToken(String token){
    UserExtraInfo foundUserInfo = userExtraInfoRepo.findByRefreshToken(token).orElse(null);;
    User foundUser = userRepo.findById(foundUserInfo.getUserId()).orElse(null);;
    String accessToken = jwtService.generateAccessToken(foundUser);;
    return new Response<String>().sendSuccessResponse(200, "New accessToken Generated" , accessToken).sendResponse();
 
  }


  public ResponseEntity<Response<UserBalance>> getUserBalance (HttpServletRequest request)throws Exception{
    try {
      Long userId = (long) request.getAttribute("user_id");
      UserBalance foundUserBalance  = userBalancRepo.findByUser(userId).orElse(null);
      if (foundUserBalance == null) {
        UserBalance userBalance = new UserBalance(userId , Double.parseDouble("0"));;
        userBalancRepo.save(userBalance);
        return new Response<UserBalance>().sendSuccessResponse(201, "User balance found", userBalance).sendResponse();
      }
      return new Response<UserBalance>().sendSuccessResponse(200, "User balance found successfully done " , foundUserBalance).sendResponse();
    } catch (Exception e) {
      System.out.println(e.getLocalizedMessage());
      return null;
      // TODO: handle exception
    }
  }
}
