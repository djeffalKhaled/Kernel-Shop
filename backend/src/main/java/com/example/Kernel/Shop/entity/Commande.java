package com.example.Kernel.Shop.entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.awt.*;
import java.util.Date;
import java.util.List;

@Document(collection = "Commandes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Commande {
    @Id
    private String id;
    private String clientId;
    private Date dateCommande;
    private List <Item> items;

    public float calculerPrix() {
        float total = 0f;
        if (items != null) {
            for (Item item : items) {
                total += item.getPrice() * item.getQuantity();
            }
        }
        return total;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Item {
        private String productId;
        private int quantity;
        private float price;
    }

}
