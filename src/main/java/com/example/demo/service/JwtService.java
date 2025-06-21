package com.example.demo.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import java.security.Key;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import org.springframework.stereotype.Service;
import com.example.demo.model.User;

@Service
public class JwtService {

    // Secret key for signing JWT (in a real application, use a secure key and keep it safe)
    private static final String SECRET_KEY = "MySuperSecretKeyForJWTGeneration";
    // Token validity period (e.g., 24 hours)
    private static final long EXPIRATION_TIME_MS = 24 * 60 * 60 * 1000;

    public String generateToken(User user) {
        Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME_MS))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        try {
            Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject();
        } catch (JwtException e) {
            // Token invalid or expired
            return null;
        }
    }

    public boolean validateToken(String token, User user) {
        String username = extractUsername(token);
        return (username != null && username.equals(user.getEmail()));
    }
}
