package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    // cala ta funkcja tylko na czas testow
    // prawdopodobnie bedzie potrzebna potem, ale w innej formie
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // UWAGA: tylko na czas developmentu!
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/api/users").permitAll() // tylko rejestracja publiczna
//                        .anyRequest().authenticated()
                        .anyRequest().permitAll() // na czas testow pozwala wykonywac requesty bez Authorization
                )
                .httpBasic(); // lub formLogin() jeśli masz formularz logowania
        return http.build();
    }
}
