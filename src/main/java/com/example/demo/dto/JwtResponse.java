package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {
    private String token;
    // private UserDto user;
// w AuthController.registerUser() dodaj UserDto do odpowiedzi:
// return ResponseEntity.ok(new JwtResponse(token, createdUser));
}
