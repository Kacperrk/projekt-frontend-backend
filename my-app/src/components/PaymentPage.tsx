import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { useAppDispatch } from '../hooks';
import { clearCart } from '../slices/cartSlice';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RcxJSQQV82LYFT7nvYtCpbFBYGjLd5zY8gLP1Co9ZP4uMbiXlcJqAqvyg85tqoyHqdGUskPldAe8vjFqCNC7FnL00mfYuobqd');

const PaymentPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const { orderId, totalPrice } = location.state || {};

    if (!orderId || !totalPrice) {
        return (
            <Typography variant="h6" textAlign="center" mt={4}>
                Brak danych zamówienia
            </Typography>
        );
    }

    const handleStripePayment = async () => {
        dispatch(clearCart());
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

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom textAlign="center">
                Płatność za zamówienie
            </Typography>
            <Typography variant="h6" gutterBottom textAlign="center">
                Kwota do zapłaty: ${totalPrice.toFixed(2)}
            </Typography>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button variant="contained" color="primary" onClick={handleStripePayment}>
                    Przejdź do płatności Stripe
                </Button>
            </Box>
        </Box>
    );
};

export default PaymentPage;
