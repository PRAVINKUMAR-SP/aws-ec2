package com.example.awslogintest.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;

@Component
public class DatabaseFixer {

    private static final Logger logger = LoggerFactory.getLogger(DatabaseFixer.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void fixDatabase() {
        logger.info("Running automatic database column type fixes for Base64 image support...");

        try {
            jdbcTemplate.execute("ALTER TABLE products ALTER COLUMN image_url TYPE TEXT;");
            logger.info("Successfully ensured products.image_url is TEXT.");
        } catch (Exception e) {
            logger.warn("Could not alter products.image_url. Reason: {}", e.getMessage());
        }

        try {
            jdbcTemplate.execute("ALTER TABLE product_images ALTER COLUMN image_url TYPE TEXT;");
            logger.info("Successfully ensured product_images.image_url is TEXT.");
        } catch (Exception e) {
            logger.warn("Could not alter product_images.image_url. Reason: {}", e.getMessage());
        }

        try {
            jdbcTemplate.execute("ALTER TABLE product_highlights ALTER COLUMN highlight TYPE TEXT;");
            logger.info("Successfully ensured product_highlights.highlight is TEXT.");
        } catch (Exception e) {
            logger.warn("Could not alter product_highlights.highlight. Reason: {}", e.getMessage());
        }
        
        logger.info("Database column fixes completed.");
    }
}
