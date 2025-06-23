package com.example.demo.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.config.StripeProvider;

import java.util.Map;

@RestController
@RequestMapping(path = "/stripe")
@AllArgsConstructor
public class StripeController {

    private final StripeProvider stripeProvider;

    @PostMapping("/webhook")
    public void handleStripeWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        stripeProvider.handleWebhook(payload, sigHeader);
    }

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, String>> createCheckoutSession(@RequestBody Map<String, Object> data) {
        String sessionId = stripeProvider.createCheckoutSession(data);

        System.out.println("✅ Sesja Stripe utworzona: " + sessionId);

        return ResponseEntity.ok(Map.of("sessionId", sessionId));
    }
}
