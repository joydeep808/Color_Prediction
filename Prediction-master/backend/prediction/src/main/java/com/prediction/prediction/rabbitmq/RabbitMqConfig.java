package com.prediction.prediction.rabbitmq;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@EnableRabbit
@Configuration
public class RabbitMqConfig {

  public  static final String SUCCESS_QUEUE = "success_queue";

  @Bean
  public Queue queue(){
    return new Queue(SUCCESS_QUEUE);
  }


}
