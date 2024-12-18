package com.prediction.prediction.config.auth;

import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import com.prediction.prediction.entity.User;
import com.prediction.prediction.exception.mapper.jwt.JwtMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Component
public class JwtService {

  private final Environment environment;


  private String secret;
  private final SecretKey key;

  private  Long accessTokenExpiry;
  private  Long refreshTokenExpiry;



  public JwtService(Environment env) {
    this.environment = env;
    String accessTokenExpiry = environment.getProperty("token.accessTokenExpiry");
    this.accessTokenExpiry = Long.parseLong(accessTokenExpiry);
    String refreshTokenExpiry  = environment.getProperty("token.refreshTokenExpiry");
    this.refreshTokenExpiry = Long.parseLong(refreshTokenExpiry);
    this.secret = environment.getProperty("jwt.secret");
    byte[] bytes = Base64.getEncoder().encode(secret.getBytes());
    this.key = new SecretKeySpec(bytes, "HmacSHA256");
  }


  

  public String generateAccessToken(User user) {
    return Jwts.builder()
        .claim("id", user.getId())
        .claim("nickName", user.getNickName())
        .claim("lastLogin", user.getLastLogin())
        .claim("role", user.getRole().toString())
        .claim("email", user.getEmail())
        .issuedAt(new Date(Instant.now().toEpochMilli()))
        .expiration(new Date(System.currentTimeMillis() + 30 * 60 * 60 * 1000 )) // Use seconds for expiration
        .signWith(key)
        .compact();
  }
  public String generateRefreshToken(){
    return UUID.randomUUID().toString();
  }
  public Claims decodeTheToken(String token){
    return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
  }
  public Long getUserId(String token){
     Claims decodedToken = decodeTheToken(token);
    if (decodedToken.getExpiration().before(new Date())) {
      return null;
    }
    return decodedToken.get("id" , Long.class);
  }
  public String getUserEmail(String token){
    Claims decodedToken = decodeTheToken(token);
    if (decodedToken.getExpiration().before(new Date())) {
      return null;
    }
    return decodedToken.get("email" , String.class);
  }
  public JwtMapper getAccessTokenDetails(String token){
    Claims decodedToken = decodeTheToken(token);
    if (decodedToken.getExpiration().before(new Date())) {
      return null;
    }
    String email = decodedToken.get("email").toString(); 
    Long user = decodedToken.get("id", Long.class);
    String role = decodedToken.get("role" , String.class);
    return JwtMapper.builder().email(email).id(user).role(role).build();
  }


  public Long getRefreshTokenExpiryTime(){
    return refreshTokenExpiry.longValue();
  }
  public Long getAccessTokenExpiryTime(){
    return accessTokenExpiry.longValue();
  }

}
