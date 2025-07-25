import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { stripePromise } from '../stripe';

const PaymentPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { orderId, totalPrice } = location.state || {};

    if (!orderId || !totalPrice) {
        return (
            <Typography variant="h6" textAlign="center" mt={4}>
                Brak danych zamówienia
            </Typography>
        );
    }

    const handleStripePayment = async () => {
        try {
            const res = await fetch("http://localhost:8080/stripe/create-checkout-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderId,
                    totalPrice: Math.round(totalPrice * 100)
                })
            });

            const { sessionId } = await res.json();

            const stripe = await stripePromise;
            if (!stripe) {
                console.error("Stripe nie został załadowany");
                return;
            }

            await stripe.redirectToCheckout({ sessionId });
        } catch (err) {
            console.error("Błąd podczas inicjowania płatności:", err);
        }
    };

    // Nowa funkcja do płatności przy odbiorze
    const handlePaymentOnPickup = () => {
        navigate('/success', { state: { orderId, paymentMethod: 'cash_on_pickup' } });
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom textAlign="center">
                Płatność za zamówienie
            </Typography>
            <Typography variant="h6" gutterBottom textAlign="center">
                Kwota do zapłaty: {totalPrice.toFixed(2)} zł
            </Typography>

            <Box sx={{ mt: 4, textAlign: 'center', display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button variant="contained" color="primary" onClick={handleStripePayment}>
                    Przejdź do płatności Stripe
                </Button>
                <Button variant="outlined" color="secondary" onClick={handlePaymentOnPickup}>
                    Płatność przy odbiorze
                </Button>
            </Box>
        </Box>
    );
};

export default PaymentPage;
