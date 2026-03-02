package com.example.Kernel.Shop.controller;

import com.example.Kernel.Shop.entity.Livraison;
import com.example.Kernel.Shop.entity.Product;
import com.example.Kernel.Shop.entity.Supplier;
import com.example.Kernel.Shop.repository.LivraisonRepository;
import com.example.Kernel.Shop.repository.ProductRepository;
import com.example.Kernel.Shop.repository.SupplierRepository;
import com.example.Kernel.Shop.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;


@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {

    private final SupplierRepository supplierRepository;
    private final ProductRepository productRepository;
    private final LivraisonRepository livraisonRepository;
    private final BCryptPasswordEncoder  passwordEncoder;
    public SupplierController(SupplierRepository supplierRepo,
                              ProductRepository productRepo,
                              LivraisonRepository livraisonRepo,BCryptPasswordEncoder passwordEncoder) {
        this.supplierRepository = supplierRepo;
        this.productRepository = productRepo;
        this.livraisonRepository = livraisonRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public Supplier register(@RequestBody Supplier supplier) {
        supplier.setPassword(passwordEncoder.encode(supplier.getPassword()));
        return supplierRepository.save(supplier);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        Supplier supplier = supplierRepository.findByEmail(email);
        
        if (supplier == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        if (!passwordEncoder.matches(password, supplier.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Wrong password");
        }

        String token = JwtUtil.generateToken(email);
        Map<String, Object> responseBody = Map.of(
            "token", token,
            "id", supplier.getId(),
            "username", supplier.getUsername() 
        );

        return ResponseEntity.ok(responseBody);
    }


    @PostMapping("/{supplierId}/products/add")
    public Product addProduct(@PathVariable String supplierId, @RequestBody Product product) {
        Product saved = productRepository.save(product);

        Supplier supplier = supplierRepository.findById(supplierId).orElseThrow();
        if (supplier.getProductIds() == null) supplier.setProductIds(new ArrayList<>());
        supplier.getProductIds().add(saved.getId());
        supplierRepository.save(supplier);

        return saved;
    }

    @PutMapping("/{supplierId}/products/{productId}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable String supplierId,
            @PathVariable String productId,
            @RequestBody Product updatedProduct) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(updatedProduct.getName());
        product.setDescription(updatedProduct.getDescription());
        product.setPrice(updatedProduct.getPrice());
        product.setStock(updatedProduct.getStock());

        productRepository.save(product);

        return ResponseEntity.ok(product);
    }


    @DeleteMapping("/{supplierId}/products/{productId}")
    public ResponseEntity<String> deleteProduct(
            @PathVariable String supplierId,
            @PathVariable String productId) {

        productRepository.deleteById(productId);

        Supplier supplier = supplierRepository.findById(supplierId)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        supplier.getProductIds().remove(productId);
        supplierRepository.save(supplier);

        return ResponseEntity.ok("Product deleted successfully");
    }


    @GetMapping("/{supplierId}/products/{productId}")
    public ResponseEntity<Product> consultProduct(
            @PathVariable String supplierId,
            @PathVariable String productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        return ResponseEntity.ok(product);
    }



    @PostMapping("/{supplierId}/livraisons")
    public ResponseEntity<Livraison> ajouterLivraison(
            @PathVariable String supplierId,
            @RequestBody Livraison livraison) {

        livraison.setStatus("En attente");
        livraisonRepository.save(livraison);

        Supplier supplier = supplierRepository.findById(supplierId)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        supplier.getLivraisonIds().add(livraison.getId());
        supplierRepository.save(supplier);

        return ResponseEntity.ok(livraison);
    }


}
