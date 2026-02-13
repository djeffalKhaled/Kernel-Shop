package com.example.Kernel.Shop.repository;

import com.example.Kernel.Shop.entity.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String> {

    List<Notification> findByClientId(String clientId);

}
