package com.example.Kernel.Shop.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Document(collection = "Addresses")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Address {

    @Id

    private String id;
    private String building;
    private String street;
    private String city;
    private String country;


}
