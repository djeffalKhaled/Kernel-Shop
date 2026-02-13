package com.example.Kernel.Shop.repository;

import com.example.Kernel.Shop.entity.Livraison;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LivraisonRepository extends MongoRepository<Livraison, String> {
    List<Livraison> findByClientId(String clientId);

}
