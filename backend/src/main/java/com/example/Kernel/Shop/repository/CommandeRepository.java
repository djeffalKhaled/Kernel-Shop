package com.example.Kernel.Shop.repository;

import com.example.Kernel.Shop.entity.Commande;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CommandeRepository extends MongoRepository<Commande, String> {
    List<Commande> findByClientId(String clientId);

}
