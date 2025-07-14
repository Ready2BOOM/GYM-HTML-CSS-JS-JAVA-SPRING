package com.example.controller;

import com.example.model.User;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	private UserRepository userRepository;

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody User user) {
		if (userRepository.findByLogin(user.getLogin()) != null) {
			return ResponseEntity.badRequest().body("Login already exists");
		}
		user.setCreatedAt(LocalDateTime.now());
		return ResponseEntity.ok(userRepository.save(user));
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user) {
		User existingUser = userRepository.findByLoginAndPassword(user.getLogin(), user.getPassword());
		if (existingUser != null) {
			return ResponseEntity.ok(existingUser);
		}
		return ResponseEntity.badRequest().body("Invalid credentials");
	}
}
