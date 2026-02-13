package com.example.Kernel.Shop.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.awt.*;
import java.util.Date;

@Document(collection = "Notifications")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Notification {
    @Id
    private String id;
    private String clientId;
    private String message;
    private Date dateNotification;

//it doesnt work i dont know why ?

}
