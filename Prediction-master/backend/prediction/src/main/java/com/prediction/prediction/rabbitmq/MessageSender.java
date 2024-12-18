package com.prediction.prediction.rabbitmq;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MessageSender {
  private final RabbitTemplate template;
  public Boolean sendMessageToQueue(String message) {
   try {
     template.convertAndSend(RabbitMqConfig.SUCCESS_QUEUE, message);
     return true;
   } catch (Exception e) {
    return false;
   }
  }
    @Bean
  public ObjectMapper objectMapper(){
    return new ObjectMapper();
  }
}
