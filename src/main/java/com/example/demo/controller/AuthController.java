package com.example.demo.controller;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.dto.JwtResponse;
import com.example.demo.dto.UserDto;
import com.example.demo.mapper.UserMapper;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.JwtService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserMapper userMapper;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        Optional<User> existingUser = userRepository.findByEmail(registerRequest.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Email is already in use"));
        }

        UserDto dto = new UserDto();
        dto.setUsername(registerRequest.getUsername());
        dto.setEmail(registerRequest.getEmail());
        dto.setPassword(registerRequest.getPassword());

        UserDto createdUser = userService.create(dto);

        User savedEntity = userRepository.findByEmail(createdUser.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found after creation"));

        String token = jwtService.generateToken(savedEntity);
        UserDto userDto = userMapper.toDto(savedEntity);

        return ResponseEntity.ok(new JwtResponse(token, userDto));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());
        if (userOpt.isEmpty() || !passwordEncoder.matches(loginRequest.getPassword(), userOpt.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid email or password"));
        }
        User user = userOpt.get();
        String token = jwtService.generateToken(user);

        UserDto userDto = userMapper.toDto(user);
        JwtResponse jwtResponse = new JwtResponse(token, userDto);
        return ResponseEntity.ok(jwtResponse);
    }
}
