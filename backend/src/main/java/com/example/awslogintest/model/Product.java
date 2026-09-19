package com.example.awslogintest.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    @Column(length = 1000)
    private String description;
    
    private Double price;
    private String category;
    
    @Column(columnDefinition = "TEXT")
    private String imageUrl;
    
    private Double rating;
    private Integer reviewCount;
    
    private Integer stockQuantity;
    
    @ElementCollection
    @CollectionTable(name = "product_highlights", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "highlight", columnDefinition = "TEXT")
    private java.util.List<String> highlights;

    @ElementCollection
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url", columnDefinition = "TEXT")
    private java.util.List<String> galleryImages;
}
