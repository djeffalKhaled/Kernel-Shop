package com.example.Kernel.Shop.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.Kernel.Shop.entity.Product;
import com.example.Kernel.Shop.repository.ProductRepository;


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
/*
    @PutMapping
    public Product updateProduct(@RequestBody Product product) {
        if (product.getId() == null) {
            throw new RuntimeException("Product ID must not be null for update");
        }

        return productRepo.save(product);
    }
 */

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable String id) {
        return productRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found"));
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
/*
    @GetMapping("/{name}")
    public Product getProduct(@PathVariable String name) {
        return productRepo.findByName(name)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }
 */
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable String id,@RequestBody Product updatedProduct) {

        Product product = productRepo.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(updatedProduct.getName());
        product.setDescription(updatedProduct.getDescription());
        product.setPrice(updatedProduct.getPrice());
        product.setStock(updatedProduct.getStock());
        product.setImageUrl(updatedProduct.getImageUrl());
        product.setCategorie(updatedProduct.getCategorie());
        product.setType(updatedProduct.getType());

        return productRepo.save(product);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable String id) {
        Product product = productRepo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
        productRepo.deleteById(id);
    }

}
