package com.example.Kernel.Shop.controller;

import com.example.Kernel.Shop.entity.Client;
import com.example.Kernel.Shop.entity.Product;
import com.example.Kernel.Shop.repository.ClientRepository;
import com.example.Kernel.Shop.repository.CommandeRepository;
import com.example.Kernel.Shop.repository.ProductRepository;
import com.example.Kernel.Shop.repository.ReviewRepository;
import com.example.Kernel.Shop.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/clients")
public class ClientController {

    private final ClientRepository clientRepository;
    private final ProductRepository productRepository;
    private final CommandeRepository commandeRepository;
    private final ReviewRepository reviewRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public ClientController(ClientRepository clientRepository, ProductRepository productRepository, CommandeRepository commandeRepository, ReviewRepository reviewRepository, BCryptPasswordEncoder passwordEncoder) {
        this.clientRepository = clientRepository;
        this.productRepository = productRepository;
        this.commandeRepository = commandeRepository;
        this.reviewRepository = reviewRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/test-db")
    public String testDatabase() {
        long count = clientRepository.count();
        return "Connected! Number of clients = " + count;
    }


    @PostMapping("/register")
    public Client register(@RequestBody Client client) {
        client.setPassword(passwordEncoder.encode(client.getPassword())); // use injected bean
        return clientRepository.save(client);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String password = request.get("password");

        Client client = clientRepository.findByEmail(email);

        if (client == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        if (!passwordEncoder.matches(password, client.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Wrong password");
        }

        String token = JwtUtil.generateToken(email);

        return ResponseEntity.ok(Map.of("token", token));
    }




    @GetMapping("/clients")
    public List<Client> listClients() {
        return clientRepository.findAll();
    }



    @GetMapping("/product/{name}")
    public Product consultProduct(@PathVariable String name) {
        return productRepository.findByName(name).orElse(null);
    }

    @PostMapping("/product/{name}/order")
    public ResponseEntity<?> commandeProduct(@PathVariable String name, @RequestParam int qte) {

        Product p = productRepository.findByName(name).orElse(null);

        if (p == null) {return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");}

        if (p.getStock() < qte) {return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not enough stock");}

        p.setStock(p.getStock() - qte);
        productRepository.save(p);

        return ResponseEntity.ok(Map.of(
                "message", "Order successful",
                "product", p.getName(),
                "orderedQuantity", qte,
                "remainingStock", p.getStock()));
    }


    @PostMapping("/product/{name}/rate")
    public ResponseEntity<?> rate(@PathVariable String name,@RequestBody Map<String, Object> body) {

        Product product = productRepository.findByName(name).orElse(null);

        if (product == null) {return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");}

        int score = (int) body.get("score");
        String description = (String) body.get("description");

        if (score < 1 || score > 5) {return ResponseEntity.badRequest().body("Score must be between 1 and 5");}

        return ResponseEntity.ok(Map.of(
                "message", "Product rated successfully",
                "product", name,
                "score", score,
                "description", description
        ));
    }

}
