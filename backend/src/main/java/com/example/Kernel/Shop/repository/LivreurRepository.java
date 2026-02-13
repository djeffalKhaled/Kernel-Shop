package com.example.Kernel.Shop.repository;

import com.example.Kernel.Shop.entity.Livreur;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LivreurRepository extends MongoRepository<Livreur, String> {
    Livreur findByEmail(String email);
}
