package com.prediction.prediction.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.prediction.prediction.entity.Prediction;
import com.prediction.prediction.exception.mapper.prediction.PredictionMapper;

@Repository
public interface PredictionRepo extends JpaRepository<Prediction , Long> {

  @Query(value = "SELECT p.id , p.number , p.status, p.end_time FROM prediction as p ORDER BY end_time DESC  " , nativeQuery = true)
  Page<PredictionMapper> getPredictions(Pageable pageable);


  @Query(value = "SELECT p.id , p.number , p.status, p.end_time FROM prediction as p ORDER BY end_time DESC  " , nativeQuery = true)
  Page<Prediction> getPredictionsForBidCache(Pageable pageable);

  @Query(value = "SELECT * from prediction where id = :id" , nativeQuery = true)
  Optional<Prediction> findByPredictionId(@Param("id") Long id );


  // i have no idea why sprin boot converts my enum to smallint instead of String 
  // that's 0 for open and 1 for closed
  @Query(value = "SELECT * FROM prediction ORDER BY end_time DESC limit 1" , nativeQuery = true) 
  Prediction getLatestPrediction();
}