package com.prediction.prediction.config.auth;

import java.time.Instant;
import java.util.Date;

import org.springframework.stereotype.Component;

import com.prediction.prediction.entity.User;
import com.prediction.prediction.entity.UserExtraInfo;
import com.prediction.prediction.exception.MainException;
import com.prediction.prediction.exception.mapper.jwt.JwtMapper;
import com.prediction.prediction.exception.thrown_exception.GenericException;
import com.prediction.prediction.repository.UserExtraInfoRepo;
import com.prediction.prediction.repository.UserRepo;
import com.prediction.prediction.util.CookieUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;



@RequiredArgsConstructor
@Component
public class CookieService {
  private final JwtService jwtService;
  private final CookieUtil cookieUtil;
  private final UserRepo userRepo;
  private final UserExtraInfoRepo userExtraInfoRepo;

  

  public Boolean checkUserAuthentication(HttpServletRequest request, HttpServletResponse response , String role) throws MainException {
    // Retrieve cookies from the request
    Cookie[] userCookies = request.getCookies();
    
    // If no cookies are present, throw an exception indicating the user needs to login
    if (userCookies == null) {
        throw new GenericException(401, "Please login");
    }

    String userAccessToken = null;
    String userRefreshToken = null;

    // Iterate over cookies to find access and refresh tokens
    for (Cookie cookie : userCookies) {
        if (cookie.getName().equals("accessToken")) {
            userAccessToken = cookie.getValue();
        }
        if (cookie.getName().equals("refreshToken")) {
            userRefreshToken = cookie.getValue();
        }
    }

    // If both tokens are missing, throw an exception indicating the user is not logged in
    if (userAccessToken == null && userRefreshToken == null) {
        throw new GenericException(401, "You are not logged in");
    }

    // If an access token is present, validate it
    if (userAccessToken != null) {
        JwtMapper accessTokenDetails = jwtService.getAccessTokenDetails(userAccessToken);

        // If the access token is invalid (no user ID), check for a refresh token
        if (accessTokenDetails.getId() == null) {
            if (userRefreshToken == null) {
                throw new GenericException(401, "You are not authorized");
            }
            // If the refresh token is present, validate it
            return userRefreshTokenCheck(userRefreshToken, response, request);
        }

        // Set the user ID in the request attributes for further processing
        request.setAttribute("user_id", accessTokenDetails.getId());

        // Retrieve user roles from the request
        String[] roles =  accessTokenDetails.getRole().toString().split(",");

        // Check if the user has any valid roles
        Integer i = 0;
        Boolean isRoleMatches = false;
        while (i < roles.length) {
          if (roles[i] != null && roles[i] != "" && roles[i].equals(role)) {
            isRoleMatches = true;
            break;
          }
          if (roles[i] != "" || roles[i] != null) {
                isRoleMatches = true;
                break;
            }
            i++;
        }

        // If no valid roles are found, throw an unauthorized exception
        if (!isRoleMatches) {
            throw new GenericException(401, "You are not authorized");
        }

        // If all checks pass, return true indicating successful authentication
        return true;
    }

    // If access token is invalid, attempt to validate using the refresh token
    return userRefreshTokenCheck(userRefreshToken, response, request);
}


  public Boolean userRefreshTokenCheck(String refreshToken , HttpServletResponse response  , HttpServletRequest request) throws GenericException{
    UserExtraInfo foundUserInfo = userExtraInfoRepo.findByRefreshToken(refreshToken).orElseGet(null);;
    if (foundUserInfo == null) {
      cookieUtil.removeRefreshToken(response);
      throw new GenericException(400, "Please login again ");
    };
    if (foundUserInfo.getIsUserParmanentBlocked() ) {
      cookieUtil.removeRefreshToken(response);
      throw new GenericException(400, "User Blocked permanently");
    }
    if (foundUserInfo.getIsUserTemporaryBlocked()) {
      cookieUtil.removeRefreshToken(response);
      throw new GenericException(400, "You are temporary blocked try after " + ((System.currentTimeMillis()-foundUserInfo.getTemporaryBlockedExpiry())/ 1000 / 60 / 60) + "Hours");
    }
    if (Date.from(Instant.ofEpochSecond(foundUserInfo.getExpiry())).before(new Date())) {
      cookieUtil.removeRefreshToken(response);
      throw new GenericException(400, "Please login again");
    }
    User foundUser = userRepo.findById(foundUserInfo.getUserId()).orElse(null);;
    if (foundUser == null) {
      cookieUtil.removeRefreshToken(response);
      throw new GenericException(400, "You have deleted your accound");
    }
    request.setAttribute("user_id", foundUser.getId());
    request.setAttribute("user_role", foundUser.getRole().toString());
    // String accessToken = jwtService.generateAccessToken(foundUser);
    return true;
  }


  // public String getAccessTokenFromRequest(HttpServletRequest request){
    

  // }
  
}
