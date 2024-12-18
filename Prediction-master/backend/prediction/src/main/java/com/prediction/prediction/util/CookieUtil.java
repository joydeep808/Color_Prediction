package com.prediction.prediction.util;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import com.prediction.prediction.exception.thrown_exception.EnvironmentNotSetException;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
@Component
public class CookieUtil {
  private final Environment environment;
  private final Integer accessTokenExpiry;
  private final Integer refreshTokenExpiry;
  public CookieUtil( Environment env) throws EnvironmentNotSetException{
    this.environment = env;
    String accessTokenExpiry = environment.getProperty("token.accessTokenExpiry");
    String refreshTokenExpiry = environment.getProperty("token.refreshTokenExpiry");
    if (accessTokenExpiry == null || refreshTokenExpiry == null) {
      throw new EnvironmentNotSetException(400, "Env not set");
    }
    Long accessTokenExpiryInSeconds= (Long.parseLong(accessTokenExpiry)) / 1000;
    Long refreshTokenExpiryInSeconds= (Long.parseLong(refreshTokenExpiry)) / 1000;
    this.accessTokenExpiry = Integer.parseInt(accessTokenExpiryInSeconds.toString());
    this.refreshTokenExpiry  = Integer.parseInt(refreshTokenExpiryInSeconds.toString());
  }


  // public String addCookiesToUserSesssion(HttpServletResponse response , User user  ){
  //   String newAccessToken = jwtService.generateAccessToken(user);;
  //   String newRefreshToken = jwtService.generateRefreshToken();
  //   Cookie accessToken = new Cookie("accessToken",newAccessToken );
  //   Cookie refreshToken = new Cookie("refreshToken", newRefreshToken);
  //   addAccessToken(response, accessToken);
  //   addRefreshToken(response, refreshToken);
  //   return newRefreshToken;
  // }
  // public Boolean addAccessTokenCookieToUserSession(HttpServletResponse  response , User user){
  //   String newAccessToken = jwtService.generateAccessToken(user);;
  //   Cookie accessToken = new Cookie("accessToken",newAccessToken );
  //   addAccessToken(response, accessToken);
  //   return true;

  // }

  public Boolean addAccessToken(HttpServletResponse response , String name,String token){
    Cookie cookie = new Cookie(name, token);
    response.addCookie(cookie);
    cookie.setMaxAge(accessTokenExpiry);
    cookie.setHttpOnly(true);
    cookie.setSecure(true);
    return true;
  }
  public Boolean addRefreshToken(HttpServletResponse response , Cookie cookie){
    response.addCookie(cookie);
    cookie.setMaxAge(refreshTokenExpiry / 1000);
    cookie.setHttpOnly(true);
    cookie.setSecure(true);
    return true;
  }
  public Boolean removeRefreshToken(HttpServletResponse response){
    Cookie refreshToken = new Cookie("refreshToken", "");
    response.addCookie(refreshToken);
    refreshToken.setMaxAge(0);
    refreshToken.setHttpOnly(true);
    refreshToken.setSecure(true);
    return true;
  }
}
