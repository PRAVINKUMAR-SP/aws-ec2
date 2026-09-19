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
    
    @Column(length = 500)
    private String imageUrl;
    
    private Double rating;
    private Integer reviewCount;

    @ElementCollection
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url", length = 500)
    private java.util.List<String> galleryImages;
}
