package com.example.Kernel.Shop.controller;

import com.example.Kernel.Shop.entity.Livraison;
import com.example.Kernel.Shop.entity.Livreur;
import com.example.Kernel.Shop.repository.LivraisonRepository;
import com.example.Kernel.Shop.repository.LivreurRepository;
import com.example.Kernel.Shop.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/livreurs")
public class LivreurController {

    private final LivreurRepository livreurRepo;
    private final LivraisonRepository livraisonRepo;
    private final BCryptPasswordEncoder passwordEncoder;

    public LivreurController(LivreurRepository livreurRepo, LivraisonRepository livraisonRepo,BCryptPasswordEncoder passwordEncoder) {
        this.livreurRepo = livreurRepo;
        this.livraisonRepo = livraisonRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public Livreur register(@RequestBody Livreur livreur) {
        livreur.setPassword(passwordEncoder.encode(livreur.getPassword()));
        return livreurRepo.save(livreur);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        Livreur livreur = livreurRepo.findByEmail(email);

        if (livreur != null && passwordEncoder.matches(password, livreur.getPassword())) {
            String token = JwtUtil.generateToken(email); // generate token
            return Map.of("token", token); // return JSON { "token": "..." }
        }

        throw new RuntimeException("Email ou mot de passe incorrect");
    }


    @GetMapping
    public List<Livreur> listLivreurs() {
        return livreurRepo.findAll();
    }

    @GetMapping("/livraison/{id}")
    public Livraison getLivraison(@PathVariable String id) {
        return livraisonRepo.findById(id).orElseThrow(() -> new RuntimeException("Livraison non trouvée"));
    }

    @PutMapping("/livraison/{id}/deliver")
    public Livraison deliver(@PathVariable String id) {
        Livraison livraison = livraisonRepo.findById(id).orElseThrow(() -> new RuntimeException("Livraison non trouvée"));

        livraison.setStatus("LIVREE");
        return livraisonRepo.save(livraison);
    }


}
