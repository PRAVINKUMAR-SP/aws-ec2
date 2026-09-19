package com.example.awslogintest.controller;

import com.example.awslogintest.model.User;
import com.example.awslogintest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists!");
        }
        
        // Hash the password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        // Grant admin privileges to the designated admin email
        if ("admin@a2zcart.com".equalsIgnoreCase(user.getEmail()) || "pravin007ptk@gmail.com".equalsIgnoreCase(user.getEmail()) || "pravin007ptk@gmail".equalsIgnoreCase(user.getEmail())) {
            user.setRole("ADMIN");
        } else {
            user.setRole("USER");
        }
        
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                return ResponseEntity.ok(java.util.Map.of(
                        "message", "Login successful!",
                        "email", user.getEmail(),
                        "name", user.getName() != null ? user.getName() : "",
                        "role", user.getRole() != null ? user.getRole() : "USER"
                ));
            }
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
