package com.example.Kernel.Shop.controller;

import com.example.Kernel.Shop.entity.Notification;
import com.example.Kernel.Shop.repository.NotificationRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;


@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationRepository notificationRepository;

    public NotificationController(NotificationRepository notificationRepo) {
        this.notificationRepository = notificationRepo;
    }

    @PostMapping("/send/{clientId}")
    public Notification envoyerNotification(@PathVariable String clientId,
                                            @RequestParam String message) {

        Notification notification = new Notification();
        notification.setClientId(clientId);
        notification.setMessage(message);
        notification.setDateNotification(new Date());

        return notificationRepository.save(notification);
    }

    @GetMapping("/list/{clientId}")
    public List<Notification> listNotifications(@PathVariable String clientId) {
        return notificationRepository.findByClientId(clientId);
    }


}
