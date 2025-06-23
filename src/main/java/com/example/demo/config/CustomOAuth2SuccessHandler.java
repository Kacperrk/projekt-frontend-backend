package com.example.demo.config;

import com.example.demo.model.User;
import com.example.demo.model.UserRole;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    public CustomOAuth2SuccessHandler(JwtService jwtService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        try {
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

            String email = oAuth2User.getAttribute("email");
            String name = oAuth2User.getAttribute("name");

            System.out.println("[OAuth2] Successful login. Email: " + email + ", Name: " + name);

            if (email == null || email.isEmpty()) {
                System.err.println("[OAuth2] ERROR: Email from Google is null or empty.");
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Google account did not provide a valid email address.");
                return;
            }

            User user = userRepository.findByEmail(email).orElseGet(() -> {
                User newUser = new User();
                newUser.setEmail(email);
                newUser.setUsername(name != null ? name : email); // fallback
                newUser.setPassword(""); // brak hasła przy OAuth2
                newUser.setRole(UserRole.USER); // lub ustaw domyślną rolę
                return userRepository.save(newUser);
            });

            String jwt = jwtService.generateToken(user);

            response.sendRedirect("http://localhost:3000/oauth2-success?token=" + jwt);

        } catch (Exception e) {
            System.err.println("[OAuth2] ERROR during success handler:");
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "OAuth2 login failed.");
        }
    }
}
