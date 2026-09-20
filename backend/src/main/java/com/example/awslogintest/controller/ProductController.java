package com.example.awslogintest.controller;

import com.example.awslogintest.model.Product;
import com.example.awslogintest.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public List<Product> getProductsByCategory(@PathVariable String category) {
        return productRepository.findByCategory(category);
    }

    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String q) {
        return productRepository.findByTitleContainingIgnoreCase(q);
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody Product product) {
        try {
            return ResponseEntity.ok(productRepository.saveAndFlush(product));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error creating product: " + e.getMessage() + (e.getCause() != null ? " | Cause: " + e.getCause().getMessage() : ""));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        try {
            return productRepository.findById(id)
                    .map(product -> {
                        product.setTitle(productDetails.getTitle());
                        product.setDescription(productDetails.getDescription());
                        product.setPrice(productDetails.getPrice());
                        product.setCategory(productDetails.getCategory());
                        product.setImageUrl(productDetails.getImageUrl());
                        product.setRating(productDetails.getRating());
                        product.setReviewCount(productDetails.getReviewCount());
                        // Important: Also update new fields
                        product.setStockQuantity(productDetails.getStockQuantity());
                        product.setHighlights(productDetails.getHighlights());
                        product.setGalleryImages(productDetails.getGalleryImages());
                        return ResponseEntity.ok(productRepository.save(product));
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error updating product: " + e.getMessage() + (e.getCause() != null ? " | Cause: " + e.getCause().getMessage() : ""));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
