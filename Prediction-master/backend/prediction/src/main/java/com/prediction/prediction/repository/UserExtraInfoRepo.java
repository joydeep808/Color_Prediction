package com.prediction.prediction.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.prediction.prediction.entity.UserExtraInfo;

@Repository
public interface UserExtraInfoRepo extends JpaRepository<UserExtraInfo, Long> {
  
  @Query(value = "SELECT * from user_extra_info where token = :token" , nativeQuery = true)
  Optional<UserExtraInfo> findByRefreshToken(@Param("token") String token);
}
