package com.prediction.prediction.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.prediction.prediction.entity.UserBalance;

@Repository
public interface UserBalancRepo extends JpaRepository<UserBalance , Long> {

  @Query(value = "SELECT * FROM user_balance where user_id = :id FOR UPDATE" , nativeQuery = true)
  Optional<UserBalance> findByUserId(@Param("id") Long id);


  @Query(value = "select * from user_balance where user_id = :id" , nativeQuery = true)
  Optional<UserBalance> findByUser(@Param("id") Long id);
  @Query(value = "SELECT * from user_balance where user_id IN :userIds", nativeQuery = true)
  List<UserBalance> getUserUsersBalanceAccount(@Param("userIds") List<Long> userIds);

}