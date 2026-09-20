package com.example.awslogintest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/debug")
public class DebugController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/db-status")
    public Map<String, Object> getDbStatus() {
        Map<String, Object> result = new LinkedHashMap<>();

        try {
            // Check column types for products table
            List<Map<String, Object>> productCols = jdbcTemplate.queryForList(
                "SELECT column_name, data_type, character_maximum_length " +
                "FROM information_schema.columns WHERE table_name = 'products' ORDER BY ordinal_position"
            );
            result.put("products_columns", productCols);
        } catch (Exception e) {
            result.put("products_error", e.getMessage());
        }

        try {
            // Check column types for product_images table
            List<Map<String, Object>> imageCols = jdbcTemplate.queryForList(
                "SELECT column_name, data_type, character_maximum_length " +
                "FROM information_schema.columns WHERE table_name = 'product_images' ORDER BY ordinal_position"
            );
            result.put("product_images_columns", imageCols);
        } catch (Exception e) {
            result.put("product_images_error", e.getMessage());
        }

        try {
            // Check column types for product_highlights table
            List<Map<String, Object>> highlightCols = jdbcTemplate.queryForList(
                "SELECT column_name, data_type, character_maximum_length " +
                "FROM information_schema.columns WHERE table_name = 'product_highlights' ORDER BY ordinal_position"
            );
            result.put("product_highlights_columns", highlightCols);
        } catch (Exception e) {
            result.put("product_highlights_error", e.getMessage());
        }

        result.put("database_fixer_class_loaded", true);
        result.put("jar_timestamp", new java.util.Date().toString());

        return result;
    }
}
