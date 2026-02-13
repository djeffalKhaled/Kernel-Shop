package com.example.Kernel.Shop.controller;

import com.example.Kernel.Shop.entity.Livraison;
import com.example.Kernel.Shop.repository.LivraisonRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/livraisons")
public class LivraisonController {
    private final LivraisonRepository livraisonRepository;

    public LivraisonController(LivraisonRepository livraisonRepo) {
        this.livraisonRepository = livraisonRepo;
    }

    @PostMapping
    public Livraison createLivraison(@RequestBody Livraison livraison) {

        livraison.setStatus("EN_ATTENTE");
        livraison.setDateLivraison(new Date());

        return livraisonRepository.save(livraison);
    }

    @GetMapping("/client/{clientId}")
    public List<Livraison> listLivraisons(@PathVariable String clientId) {
        return livraisonRepository.findByClientId(clientId);
    }

    //i got a problem here !!
    @PutMapping("/{id}/status")
    public Livraison updateStatus(@PathVariable String id, @RequestBody Livraison updatedLivraison) {

        Livraison livraison = livraisonRepository.findById(id).orElseThrow(() -> new RuntimeException("Livraison not found"));

        livraison.setStatus(updatedLivraison.getStatus());

        return livraisonRepository.save(livraison);
    }

    @DeleteMapping("/{id}")
    public void deleteLivraison(@PathVariable String id) {
        livraisonRepository.deleteById(id);
    }

}
