package com.example.Kernel.Shop.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.awt.*;

@Document(collection = "clients")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Client {
    @Id
    private String id;
    private String username;
    private String email;
    private String password;
    private String numTel;
    private Address adresse; //here I think we need to change String
    //private Image profilePicture;
    // add a client delete client ...


}
