package com.example.awslogintest;

import com.example.awslogintest.model.Product;
import com.example.awslogintest.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class AwsLoginTestBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(AwsLoginTestBackendApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(ProductRepository repository) {
		return args -> {
			if (repository.count() == 0) {
				Product p1 = new Product();
				p1.setTitle("Wireless Noise-Cancelling Headphones");
				p1.setDescription("Premium over-ear headphones with active noise cancellation and 30-hour battery life.");
				p1.setPrice(299.99);
				p1.setCategory("Electronics");
				p1.setImageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop");
				p1.setRating(4.8);
				p1.setReviewCount(1240);

				Product p2 = new Product();
				p2.setTitle("Mechanical Gaming Keyboard");
				p2.setDescription("RGB backlit mechanical keyboard with tactile switches and programmable macros.");
				p2.setPrice(129.50);
				p2.setCategory("Computers");
				p2.setImageUrl("https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop");
				p2.setRating(4.6);
				p2.setReviewCount(856);

				Product p3 = new Product();
				p3.setTitle("Smart Fitness Watch");
				p3.setDescription("Track your workouts, heart rate, and sleep with this water-resistant smartwatch.");
				p3.setPrice(199.00);
				p3.setCategory("Wearables");
				p3.setImageUrl("https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop");
				p3.setRating(4.5);
				p3.setReviewCount(3012);

				Product p4 = new Product();
				p4.setTitle("4K Ultra HD Monitor");
				p4.setDescription("27-inch 4K IPS monitor with HDR support and ultra-thin bezels for creative professionals.");
				p4.setPrice(450.00);
				p4.setCategory("Computers");
				p4.setImageUrl("https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop");
				p4.setRating(4.7);
				p4.setReviewCount(412);

				Product p5 = new Product();
				p5.setTitle("Ergonomic Office Chair");
				p5.setDescription("Breathable mesh back office chair with adjustable lumbar support and armrests.");
				p5.setPrice(249.99);
				p5.setCategory("Furniture");
				p5.setImageUrl("https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=800&auto=format&fit=crop");
				p5.setRating(4.4);
				p5.setReviewCount(210);

				repository.saveAll(List.of(p1, p2, p3, p4, p5));
				System.out.println("Seeded 5 mock products into the database.");
			}
		};
	}
}
