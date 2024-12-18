package com.prediction.prediction.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.prediction.prediction.entity.UserBid;
import com.prediction.prediction.exception.mapper.userbid.UserBidMapper;

@Repository
public interface UserBidRepo extends JpaRepository<UserBid , Long> {

  @Query(value = "SELECT u.id , u.prediction_id , u.amount , u.status , u.created_at , u.number , u.color_type FROM user_bid as u WHERE user_id = :id " , nativeQuery =  true)
  Page<UserBidMapper> findUserBids(@Param("id") Long id , Pageable pageable);

  // @Query(value = "UPDATE user_bid SET status = 'WIN' WHERE status = 'PENDING'" , nativeQuery = true) 
  // void updateBidStatus();


  @Query(value = "SELECT * from user_bid where prediction_id = :id AND status = 'PENDING'" , nativeQuery = true)
  Page<UserBid> findUserBidsByPredictionId(@Param("id") Long id , Pageable pageable);

  // @Query(value = "UPDATE user_bid SET status = 'FAILED' WHERE user_id = ANY( ARRAY[ :userIds])" , nativeQuery = true)
  @Query(value = "UPDATE user_bid SET status = 'LOOSE' WHERE id IN :userIds returning true", nativeQuery = true)
  void updateBidFailedStatus(@Param("userIds") List<String> userIds);
  @Query(value = "UPDATE user_bid SET status = 'WIN' WHERE id IN :userIds returning true", nativeQuery = true)
  void updateSuccessWithColor(@Param("userIds") List<String> userIds);


  @Query(value = "UPDATE user_bid SET status = 'WIN' WHERE id IN :userIds returning true", nativeQuery = true)
  void updateSuccessWithNumber(@Param("userIds") List<String> userIds);
  // i have to run 2 commands 
  // in this firstly i have to check whether the user predicts the correct number or not
  // i  have to check whether the user user predicts the correct color or not
   
}