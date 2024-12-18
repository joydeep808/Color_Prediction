package com.prediction.prediction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prediction.prediction.entity.UserStatistics;

@Repository
public interface UserStatisticsRepo extends JpaRepository<UserStatistics , Long> {

  
}