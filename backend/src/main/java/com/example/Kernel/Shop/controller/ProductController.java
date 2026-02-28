package com.example.Kernel.Shop.controller;

import com.example.Kernel.Shop.entity.Product;
import com.example.Kernel.Shop.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository productRepo;

    public ProductController(ProductRepository productRepo) {
        this.productRepo = productRepo;

    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productRepo.save(product);
    }

    @PutMapping
    public Product updateProduct(@RequestBody Product product) {
        if (product.getId() == null) {
            throw new RuntimeException("Product ID must not be null for update");
        }

        return productRepo.save(product);
    }

    @GetMapping("/category/{categorie}")
    public List<Product> getProductByCategorie(@PathVariable String categorie) {
        List<Product> products = productRepo.findByCategorie(categorie);
        if (products.isEmpty()) {
            throw new RuntimeException("No products found for categorie " + categorie);
        }

        return products;
    }

    @GetMapping("/type/{type}")
    public List<Product> getProductByType(@PathVariable String type) {
        List<Product> products = productRepo.findByType(type);
        if (products.isEmpty()) {
            throw new RuntimeException("No products found for type " + type);
        }

        return products;
    }

    @GetMapping("/{name}")
    public Product getProduct(@PathVariable String name) {
        return productRepo.findByName(name)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @PutMapping("/{name}")
    public Product updateProduct(@PathVariable String name,@RequestBody Product updatedProduct) {

        Product product = productRepo.findByName(name).orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(updatedProduct.getName());
        product.setDescription(updatedProduct.getDescription());
        product.setPrice(updatedProduct.getPrice());
        product.setStock(updatedProduct.getStock());
        product.setImageUrl(updatedProduct.getImageUrl());

        return productRepo.save(product);
    }

    @DeleteMapping("/{name}")
    public void deleteProduct(@PathVariable String name) {
        Product product = productRepo.findByName(name).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
        productRepo.deleteByName(name);
    }

}
