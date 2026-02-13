package com.example.Kernel.Shop.repository;

import com.example.Kernel.Shop.entity.Client;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClientRepository extends MongoRepository<Client, String> {
    Client findByEmail(String email);
}
