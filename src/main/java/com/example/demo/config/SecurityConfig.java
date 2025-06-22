package com.example.demo.config;

import com.example.demo.repository.UserRepository;
import com.example.demo.service.JwtService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors();
        // Disable CSRF as we are not using cookies for session
        http.csrf().disable();
        // Use stateless session (no HTTP session)
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        // Allow unauthenticated access to auth endpoints, require authentication for others
        http.authorizeHttpRequests()
//                .requestMatchers("/api/auth/**").permitAll()
//                .requestMatchers("/api/login",
//                        "/api/register",
//                        "/api/books/**").permitAll()
                .requestMatchers("/api/auth/**",
                        "/api/login",
                        "/api/register",
                        "/api/books/**").permitAll()
                .anyRequest().authenticated();
        // Disable form login and HTTP basic auth
        http.formLogin().disable();
        http.httpBasic().disable();
        // Add JWT filter to validate tokens on each request
        http.addFilterBefore(new JwtAuthFilter(jwtService, userRepository), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
