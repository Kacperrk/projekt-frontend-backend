package com.example.demo.stripe;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(path = "/stripe")
@AllArgsConstructor
public class StripeController {

    private final StripeService stripeService;

    @PostMapping("/webhook")
    public void handleStripeWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        stripeService.handleWebhook(payload, sigHeader);
    }

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, String>> createCheckoutSession(@RequestBody Map<String, Object> data) {
        String sessionId = stripeService.createCheckoutSession(data);

        System.out.println("Sesja Stripe utworzona: " + sessionId);

        return ResponseEntity.ok(Map.of("sessionId", sessionId));
    }
}
