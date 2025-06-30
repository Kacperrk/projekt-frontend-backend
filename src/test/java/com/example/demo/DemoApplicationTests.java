package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import io.github.cdimascio.dotenv.Dotenv;
import org.junit.jupiter.api.BeforeAll;

@SpringBootTest
class DemoApplicationTests {

    @BeforeAll
    static void loadEnv() {
        Dotenv dotenv = Dotenv.configure()
                .load();

        System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
        System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));

        System.setProperty("JWT_SECRET", dotenv.get("JWT_SECRET"));

        System.setProperty("GOOGLE_CLIENT_ID", dotenv.get("GOOGLE_CLIENT_ID"));
        System.setProperty("GOOGLE_CLIENT_SECRET", dotenv.get("GOOGLE_CLIENT_SECRET"));

        System.setProperty("STRIPE_SECRET_KEY", dotenv.get("STRIPE_SECRET_KEY"));
        System.setProperty("STRIPE_WEBHOOK_SECRET",dotenv.get("STRIPE_WEBHOOK_SECRET"));
    }

    @Test
    void contextLoads() {
    }
}
