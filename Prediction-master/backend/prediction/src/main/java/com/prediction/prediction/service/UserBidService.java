package com.prediction.prediction.service;

import java.util.List;


import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.prediction.prediction.dto.bid.UserBidCreateDto;
import com.prediction.prediction.entity.*;
import com.prediction.prediction.entity.UserBid.ColorType;
import com.prediction.prediction.exception.mapper.userbid.UserBidMapper;
import com.prediction.prediction.exception.thrown_exception.*;
import com.prediction.prediction.repository.*;
import com.prediction.prediction.util.*;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserBidService {
  
  private final UserBidRepo userBidRepo;
  private final UserBalancRepo userBalancRepo;
  private final PredictionRepo predictionRepo;
  private final BidCache bidCache;
  public ResponseEntity<Response<Boolean>> createBid(HttpServletRequest request, UserBidCreateDto userBidCreateDto) throws Exception {
    // Extract the userId from the request headers
    // i have to generate a random number between 1 to 500

    // Double random = Long.parseLong("1");
    Long userId = (long) request.getAttribute("user_id");
    // Check if the user is able to bid; if not, throw a BidClosedException
    if (!bidCache.isUserAbleToBid()) {
        throw new BidClosedException(400, "Bid closed wait for the next round");
    }

    // Retrieve the user's balance from the UserBalance repository
    UserBalance foundUserBalance = userBalancRepo.findById(userId).orElse(null);

    // Check if there is a current prediction available in the bid cache
    if (bidCache.getCurrentPrediction() != null) {
        // Verify if the user has enough balance to place the bid
        if (foundUserBalance.getBalance() >= userBidCreateDto.getAmount()) {
            // Save the user bid to the database and update the user's balance
            if (userBidCreateDto.getColor() != ""){

              saveUserBid(new UserBid(userId, bidCache.getCurrentPrediction().getId(), userBidCreateDto.getAmount() , ColorType.valueOf(userBidCreateDto.getColor())), foundUserBalance);
            }
            if(userBidCreateDto.getColor() == "" && userBidCreateDto.getNumber() != null){
              saveUserBid(new UserBid(userId, bidCache.getCurrentPrediction().getId(), userBidCreateDto.getAmount() , userBidCreateDto.getNumber()), foundUserBalance);
            }
            if(userBidCreateDto.getColor() =="" && userBidCreateDto.getNumber() == 0){
              throw new GenericException(400, "You should pass color or number");
            }
            // Return a success response indicating the bid was created successfully
            return new Response<Boolean>().sendSuccessResponse(200, "Bid created successfully").sendResponse();
        }
        // Return an error response if the user's balance is insufficient
        return new Response<Boolean>().sendErrorResponse(400, "Your balance is low").sendResponse();
    }

    // If no current prediction is available, retrieve the latest prediction from the repository
    Prediction latestPrediction = predictionRepo.getLatestPrediction();

    // Add the latest prediction to the bid cache
    bidCache.addPrediction(latestPrediction);

    // Save the user bid with the latest prediction and update the user's balance
    if (userBidCreateDto.getColor() != ""){
      ColorType colorType = ColorType.valueOf(userBidCreateDto.getColor());
      saveUserBid(new UserBid(userId, bidCache.getCurrentPrediction().getId(), userBidCreateDto.getAmount() , colorType), foundUserBalance);
    }
    if(userBidCreateDto.getNumber() != null){

      saveUserBid(new UserBid(userId, bidCache.getCurrentPrediction().getId(), userBidCreateDto.getAmount() , userBidCreateDto.getNumber()), foundUserBalance);
    }
    else{
      throw new GenericException(400, "You should pass color or number");
    }
    // Return a success response indicating the bid was created successfully
    return new Response<Boolean>().sendSuccessResponse(200, "Bid created successfully").sendResponse();
}
  public Boolean saveUserBid(UserBid bid , UserBalance foundUserBalance ) {
   try {
     foundUserBalance.setBalance(foundUserBalance.getBalance() - bid.getAmount());
     userBalancRepo.save(foundUserBalance);

     userBidRepo.save(bid);;
     return true;
   } catch (Exception e) {
    System.out.println(e.getLocalizedMessage());
    return false;
    // TODO: handle exception
   }
  }


  /**
   * Retrieves all the user bids for the currently logged in user
   * 
   * @param request The incoming HTTP request
   * @param page    The page number to retrieve
   * 
   * @return A ResponseEntity containing a successful response with a list of UserBidMapper objects
   * 
   * @throws Exception If there is an error retrieving the user bids
   */
  public ResponseEntity<Response<List<UserBidMapper>>> getUserAllBids(HttpServletRequest request, Integer page)
      throws Exception {
    // Create a Pageable object using the given page number and a page size of 20
    Pageable pageable = PageRequest.of(page <= 0 ? 0 : page - 1, 20);


    // Retrieve the user's ID from the request headers
    Long userId = (long)(request.getAttribute("user_id"));

    // Retrieve the user bids for the given user ID from the UserBid repository
    Page<UserBidMapper> foundUserBids = userBidRepo.findUserBids(userId, pageable);

    // If no user bids are found, throw a not found exception
    if (foundUserBids.isEmpty()) {
      throw new NotFoundException(404, "You haven't bid for not");
    }

    // Return a successful response with the list of UserBidMapper objects
    return new Response<List<UserBidMapper>>().sendSuccessResponse(200, "User bids found successfully",
        foundUserBids.getContent()).sendResponse();
  }

}
