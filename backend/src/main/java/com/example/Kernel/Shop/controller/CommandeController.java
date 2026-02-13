package com.example.Kernel.Shop.controller;

import com.example.Kernel.Shop.entity.Commande;
import com.example.Kernel.Shop.repository.CommandeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;


@RestController
@RequestMapping("/api/commandes")
public class CommandeController {
    private final CommandeRepository commandeRepository;

    public CommandeController(CommandeRepository commandeRepo) {
        this.commandeRepository = commandeRepo;
    }

    @PostMapping
    public Commande createCommande(@RequestBody Commande commande) {
        commande.setDateCommande(new Date());
        return commandeRepository.save(commande);
    }

    @GetMapping("/client/{clientId}")
    public List<Commande> listCommandes(@PathVariable String clientId) {
        return commandeRepository.findByClientId(clientId);
    }

    @GetMapping("/{commandeId}/prix")
    public float calculerPrix(@PathVariable String commandeId) {
        Commande commande = commandeRepository.findById(commandeId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Commande not found"));

        return commande.calculerPrix();
    }

    @DeleteMapping("/{commandeId}")
    public void deleteCommande(@PathVariable String commandeId) {
        if (!commandeRepository.existsById(commandeId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Commande not found");
        }
        commandeRepository.deleteById(commandeId);
    }

}

