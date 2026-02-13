package com.example.Kernel.Shop.repository;

import com.example.Kernel.Shop.entity.Supplier;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SupplierRepository extends MongoRepository<Supplier, String> {
    Supplier findByEmail(String email);
}
