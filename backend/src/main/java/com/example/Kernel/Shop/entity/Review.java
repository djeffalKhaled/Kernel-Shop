package com.example.Kernel.Shop.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.Date;

@Document(collection = "Rates")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Review {
    @Id
    private String id;
    private String productId;
    private String clientId;
    private String comment;
    private int score;
    private Date dateRate;

    // iwant to understand if a user try delete his account the review will also be deleted ?
}
