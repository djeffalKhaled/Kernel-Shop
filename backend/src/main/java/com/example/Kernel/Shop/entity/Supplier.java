package com.example.Kernel.Shop.entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Document(collection = "Suppliers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Supplier {

    @Id
    private String id;
    private String username;
    private String email;
    private String password;
    private int numTel;
    private String profilePicture;

    private List<String> productIds = new ArrayList<>();
    private List<String> livraisonIds = new ArrayList<>();


}
