package com.example.Kernel.Shop.repository;

import com.example.Kernel.Shop.entity.Review;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReviewRepository extends MongoRepository<Review, String> {

    List<Review> findByProductId(String productId);
    List<Review> findByClientId(String clientId);
}
