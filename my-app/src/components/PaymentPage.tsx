import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { useAppDispatch } from '../hooks';
import { clearCart } from '../slices/cartSlice';

const PaymentPage: React.FC = () => {
    const dispatch = useAppDispatch();
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
        dispatch(clearCart());
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

            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button variant="contained" color="primary" onClick={handleFakeStripe}>
                    Symuluj udaną płatność
                </Button>
            </Box>
        </Box>
    );
};

export default PaymentPage;
