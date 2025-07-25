package com.example.demo.stripe;

import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import com.stripe.model.Event;
import com.stripe.net.Webhook;
import lombok.extern.slf4j.Slf4j;

import jakarta.annotation.PostConstruct;
import java.util.Map;

@Slf4j
@Service
public class StripeService {

    @Value("${stripe.api.secret-key}")
    private String stripeApiKey;

    @Value("${stripe.webhook.secret}")
    private String stripeWebhookSecret;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    public String createCheckoutSession(Map<String, Object> data) {
        try {
            Long totalAmount = Long.parseLong(data.get("totalPrice").toString());
            String orderId = data.get("orderId").toString();

            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setClientReferenceId(orderId)
                    .setSuccessUrl("http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}")
                    .setCancelUrl("http://localhost:3000/cancel?session_id={CHECKOUT_SESSION_ID}")
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setQuantity(1L)
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency("usd")
                                                    .setUnitAmount(totalAmount)
                                                    .setProductData(
                                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                    .setName("Zamówienie #" + orderId)
                                                                    .build())
                                                    .build())
                                    .build())
                    .build();

            Session session = Session.create(params);
            return session.getId();
        } catch (Exception e) {
            log.error("StripeService.java - Nie udało się utworzyć Checkout Session", e);
            throw new RuntimeException("Stripe error podczas tworzenia sesji", e);
        }
    }

    public void handleWebhook(String payload, String sigHeader) {
        try {
            Event event = Webhook.constructEvent(payload, sigHeader, stripeWebhookSecret);

            switch (event.getType()) {
                case "checkout.session.completed" -> {
                    EventDataObjectDeserializer deserializer = event.getDataObjectDeserializer();
                    if (deserializer.getObject().isPresent()) {
                        Session session = (Session) deserializer.getObject().get();
                        log.warn("StripeService.java - Płatność zakończona sukcesem - sessionId={}", session.getId());
                    }
                }
                case "payment_intent.payment_failed" -> {
                    EventDataObjectDeserializer deserializer = event.getDataObjectDeserializer();
                    if (deserializer.getObject().isPresent()) {
                        var intent = (com.stripe.model.PaymentIntent) deserializer.getObject().get();
                        log.warn("StripeService.java - Płatność NIEUDANA – intentId={}, error={}",
                                intent.getId(),
                                intent.getLastPaymentError() != null
                                        ? intent.getLastPaymentError().getMessage()
                                        : "brak szczegółów");
                    }
                }
                case "checkout.session.expired" -> {
                    EventDataObjectDeserializer deserializer = event.getDataObjectDeserializer();
                    if (deserializer.getObject().isPresent()) {
                        Session session = (Session) deserializer.getObject().get();
                        log.warn("StripeService.java - Sesja wygasła – sessionId={}", session.getId());
                    }
                }
                default -> log.warn("StripeService.java - Nierozpoznany event: {}", event.getType());
            }

        } catch (SignatureVerificationException e) {
            log.error("StripeService.java - Webhook odrzucony – niepoprawny podpis Stripe", e);

        } catch (StripeException e) {
            log.error("StripeService.java - Błąd Stripe podczas obsługi webhooka: {}", e.getMessage(), e);

        } catch (Exception e) {
            log.error("StripeService.java - Nieoczekiwany błąd obsługi webhooka", e);
        }
    }
}
