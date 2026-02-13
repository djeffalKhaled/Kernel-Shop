package com.example.Kernel.Shop.entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.awt.*;
import java.util.Date;

@Document(collection = "Livreurs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Livreur {

    @Id
    private String id;
    private String nomLiv;
    private String email;
    private String password;
    private String numTel;
    private Date dateLivraison;
    private Boolean isDelievered; //here normalement association ????

}