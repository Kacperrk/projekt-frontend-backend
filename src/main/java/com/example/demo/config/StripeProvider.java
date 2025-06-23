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
                    .setSuccessUrl("http://localhost:3000/success") // frontend URL
                    .setCancelUrl("http://localhost:3000/cancel")
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
        String endpointSecret = "whsec_..."; // pobierz ze Stripe → Webhooks

        try {
            Event event = Webhook.constructEvent(payload, sigHeader, endpointSecret);

            switch (event.getType()) {
                case "checkout.session.completed":
                    // Zapisać do bazy że użytkownik zapłacił
//                    System.out.println("✅ Payment succeeded: " + event.getData().getObject().getId());

                    EventDataObjectDeserializer deserializer = event.getDataObjectDeserializer();

                    if (deserializer.getObject().isPresent()) {
                        Session session = (Session) deserializer.getObject().get();
                        System.out.println("Udała się płatność dla sesji: " + session.getId());
                    } else {
                        System.out.println("Nie udało się zdeserializować obiektu Session");
                    }


                    break;
                case "payment_intent.payment_failed":
                    System.out.println("Payment failed");
                    break;
                default:
                    System.out.println("Unhandled event type: " + event.getType());
            }

        } catch (Exception e) {
            System.out.println("Webhook error: " + e.getMessage());
        }
    }
}
