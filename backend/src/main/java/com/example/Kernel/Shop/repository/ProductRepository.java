package com.example.Kernel.Shop.repository;

import com.example.Kernel.Shop.entity.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends MongoRepository<Product, String> {

    Optional<Product> findByName(String name);
    List<Product> findByCategorie(String categorie);
    List<Product> findByType(String type);
    void deleteByName(String name);
}
