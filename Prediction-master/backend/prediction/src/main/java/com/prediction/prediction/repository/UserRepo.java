package com.prediction.prediction.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.prediction.prediction.entity.User;

@Repository
public interface UserRepo extends JpaRepository<User , Long> {

  @Query(value = "SELECT email from users where email = :email" , nativeQuery = true)
  Optional<String> isEmailAlreadyExist(@Param("email") String email);

  @Query(value = "SELECT * from users where email = :email" ,nativeQuery = true)
  Optional<User> findByEmail(@Param("email")String email);

}