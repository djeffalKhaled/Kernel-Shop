package com.example.Kernel.Shop.entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.awt.*;
import java.util.Date;

@Document(collection = "Livraisons")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Livraison {

    @Id
    private String id;
    private String commandeId;
    private String clientId;
    private Date dateLivraison;
    private String status;
    //private Boolean isDelivered; //pas besoin


}
