package com.prediction.prediction.rabbitmq;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prediction.prediction.dto.bid.BidUpdateDto;
import com.prediction.prediction.entity.UserBalance;
import com.prediction.prediction.entity.UserBid;
import com.prediction.prediction.entity.UserBid.ColorType;
import com.prediction.prediction.repository.UserBalancRepo;
import com.prediction.prediction.repository.UserBidRepo;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MessageListner {
  private final UserBidRepo userBidRepo;
  private final UserBalancRepo userBalancRepo;
  private final ObjectMapper objectMapper;

  /**
   * This method is annotated as a RabbitListener and will be executed
   * whenever a message is received from the RabbitMQ queue named
   * "success_queue". The message is expected to be a JSON string
   * representing a BidUpdateDto object. The method will then process the
   * message and update the bids in the user_bid table accordingly.
   * 
   * The method will first check if the message is valid. If not, it will
   * print the error message and exit. If the message is valid, it will
   * retrieve all the bids for the current prediction from the user_bid
   * table. It will then group the bids into 3 categories: success with
   * color, success with number, and failed. It will then update the bids
   * in the user_bid table accordingly. Finally, it will update the user
   * balances in the user_balance table.
   */
  @RabbitListener(queues = RabbitMqConfig.SUCCESS_QUEUE)
  public void processSuccessMessage(String message) {
    try {
      // First, we need to convert the message from a JSON string to a
      // BidUpdateDto object. This is done using the ObjectMapper.
      BidUpdateDto bidUpdateDto = objectMapper.readValue(message, BidUpdateDto.class);

      // The number of the current prediction is stored in the
      // BidUpdateDto object. We need to use this to determine the color
      // of the prediction.
      Integer number = bidUpdateDto.getNumber();

      // If the number is even, the color is GREEN, otherwise it's RED.
      ColorType colorType = number % 2 == 0 ? ColorType.GREEN : ColorType.RED;

      // We need to retrieve all the bids for the current prediction from
      // the user_bid table. We do this by calling the
      // findUserBidsByPredictionId method and passing in the current
      // prediction id and a PageRequest object with the page number and
      // page size.
      int page = 0;
      while (true) {
        Page<UserBid> userBidsByPredictionId = userBidRepo.findUserBidsByPredictionId(
            bidUpdateDto.getCurrentPredictionId(), PageRequest.of(page, 100));

        // If there are no bids in the user_bid table for the current
        // prediction, we can exit the loop.
        if (userBidsByPredictionId.isEmpty()) {
          break;
        }

        // We need to group the bids into 3 categories: success with color,
        // success with number, and failed. We do this by iterating over
        // the bids and checking if the number is 0 and the color is the
        // same as the color of the current prediction. If so, it's a
        // success with color. If the number is the same as the number of
        // the current prediction, it's a success with number. Otherwise,
        // it's a failed bid.
        List<String> failedIds = new ArrayList<>();
        List<String> successWithColor = new ArrayList<>();
        List<String> successWithNumber = new ArrayList<>();
        Map<Long, Double> userAndAmount = new HashMap<>();

        for (UserBid userBid : userBidsByPredictionId) {
          if (userBid.getNumber() == 0 && userBid.getColorType().equals(colorType)) {
            // If the bid is a success with color, add it to the
            // successWithColor list and add the amount to the user's
            // total amount.
            successWithColor.add(userBid.getId());
            userAndAmount.compute(userBid.getUserId(), (key, value) -> value == null ? userBid.getAmount() * 2 : value + userBid.getAmount() * 2);
          } else if (userBid.getNumber() == number) {
            // If the bid is a success with number, add it to the
            // successWithNumber list and add the amount to the user's
            // total amount.
            successWithNumber.add(userBid.getId());
            userAndAmount.compute(userBid.getUserId(), (key, value) -> value == null ? userBid.getAmount() * 9 : value + userBid.getAmount() * 9);
          } else {
            // If the bid is a failed bid, add it to the failedIds list.
            failedIds.add(userBid.getId());
          }
        }

        // We need to update the bids in the user_bid table accordingly.
        if (!failedIds.isEmpty()) {
          userBidRepo.updateBidFailedStatus(failedIds);
        }

        if (!successWithColor.isEmpty()) {
          userBidRepo.updateSuccessWithColor(successWithColor);
        }

        if (!successWithNumber.isEmpty()) {
          userBidRepo.updateSuccessWithNumber(successWithNumber);
        }

        // Finally, we need to update the user balances in the
        // user_balance table.
        if (!userAndAmount.isEmpty()) {
          updateBalance(userAndAmount);
        }

        // We increment the page number and continue the loop until there
        // are no more bids in the user_bid table.
        ++page;
      }
    } catch (Exception e) {
      // If there is an error, print the error message and exit.
      System.out.println(e.getLocalizedMessage());
    }
  }

  // public void findAndUpdateTheStatus(Integer pages, Long currentPredictionId) {
  //   Pageable pageable = PageRequest.of(0, 100);
  //   Page<UserBid> userBidsByPredictionId = userBidRepo.findUserBidsByPredictionId(currentPredictionId, pageable);
  //   ;
  //   for (UserBid userBid : userBidsByPredictionId) {
  //     if (userBid.getColorType() == ColorType.NONE) {

  //     }
  //   }

  // }

  public void checkUserBids(Long currentPredictionId  , int number , ColorType colorType){
    
   

  }

  public void updateBalance(Map<Long ,Double> userAndAmount) {
          List<Long> userIds = new ArrayList<>(userAndAmount.keySet());
          List<UserBalance> userBalances = userBalancRepo.getUserUsersBalanceAccount(userIds);

          for (int i = 0; i < userIds.size(); i++) {
            UserBalance userBalance = userBalances.get(i);
            userBalance.setBalance(userBalance.getBalance() + userAndAmount.get(userBalance.getUserId()));
          }

          userBalancRepo.saveAll(userBalances);
  }

}
