package com.example.demo.config;

import com.stripe.Stripe;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import com.stripe.model.Event;
import com.stripe.net.Webhook;

import jakarta.annotation.PostConstruct;
import java.util.Map;

@Service
public class StripeProvider {

    @Value("${stripe.api.secret-key}")
    private String stripeApiKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    public String createCheckoutSession(Map<String, Object> data) {
        try {
            Long totalAmount = Long.parseLong(data.get("totalPrice").toString()); // cena w centach
            String orderId = data.get("orderId").toString(); // np. 123

            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setClientReferenceId(orderId)
//                    .setSuccessUrl("http://localhost:3000/success") // frontend URL
//                    .setCancelUrl("http://localhost:3000/cancel")
                    .setSuccessUrl("http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}")
                    .setCancelUrl("http://localhost:3000/cancel?session_id={CHECKOUT_SESSION_ID}")
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setQuantity(1L)
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency("usd")
                                                    .setUnitAmount(totalAmount) // z Reacta
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
            throw new RuntimeException("Stripe error: " + e.getMessage());
        }
    }

    public void handleWebhook(String payload, String sigHeader) {
        String endpointSecret = "whsec_123456"; // <- użyj własnego sekretu z Dashboard → Webhooks

        try {
            Event event = Webhook.constructEvent(payload, sigHeader, endpointSecret);

            switch (event.getType()) {
                case "checkout.session.completed" -> {
                    EventDataObjectDeserializer deserializer = event.getDataObjectDeserializer();
                    if (deserializer.getObject().isPresent()) {
                        Session session = (Session) deserializer.getObject().get();
                        System.out.println("✅ Sukces płatności dla sesji: " + session.getId());
                        // TODO: zaktualizuj status zamówienia na 'PAID'
                    }
                }
                case "payment_intent.payment_failed" -> {
                    EventDataObjectDeserializer deserializer = event.getDataObjectDeserializer();
                    if (deserializer.getObject().isPresent()) {
                        var intent = (com.stripe.model.PaymentIntent) deserializer.getObject().get();
                        System.out.println("❌ Płatność nieudana dla intentu: " + intent.getId());
                        System.out.println("Błąd: " + intent.getLastPaymentError().getMessage());
                        // TODO: zaktualizuj status zamówienia na 'FAILED'
                    }
                }
                case "checkout.session.expired" -> {
                    EventDataObjectDeserializer deserializer = event.getDataObjectDeserializer();
                    if (deserializer.getObject().isPresent()) {
                        Session session = (Session) deserializer.getObject().get();
                        System.out.println("⚠️ Sesja wygasła: " + session.getId());
                        // TODO: zaktualizuj status zamówienia na 'EXPIRED'
                    }
                }
                default -> {
                    System.out.println("ℹ️ Nierozpoznany event: " + event.getType());
                }
            }

        } catch (Exception e) {
            System.out.println("❗ Błąd webhooka: " + e.getMessage());
        }
    }

}
