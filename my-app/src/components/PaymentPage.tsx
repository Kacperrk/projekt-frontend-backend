import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const PaymentPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { orderId, totalPrice } = location.state || {};

    if (!orderId) {
        return (
            <Typography variant="h6" textAlign="center" mt={4}>
                Brak danych zamówienia.
            </Typography>
        );
    }

    const handleFakeStripe = () => {
        // Tymczasowe zakończenie
        navigate('/moje-zamowienia');
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom textAlign="center">
                Płatność za zamówienie
            </Typography>
            <Typography variant="h6" gutterBottom textAlign="center">
                Kwota do zapłaty: ${totalPrice.toFixed(2)}
            </Typography>

            {/* Tymczasowy placeholder zamiast Stripe */}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button variant="contained" color="primary" onClick={handleFakeStripe}>
                    Symuluj udaną płatność
                </Button>
            </Box>
        </Box>
    );
};

export default PaymentPage;
