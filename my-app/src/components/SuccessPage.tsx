import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../hooks';
import { clearCart } from '../slices/cartSlice';
import { Box, Typography, Button, Paper, CircularProgress } from '@mui/material';

const SuccessPage: React.FC = () => {
    const { search, state } = useLocation();
    const sessionId = new URLSearchParams(search).get('session_id');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const confirmOrder = async () => {
            try {
                if (sessionId) {
                    await fetch(`/api/orders/confirm/${sessionId}`);
                    toast.success('Płatność zakończona sukcesem');
                } else if (state?.paymentMethod === 'cash_on_pickup' && state.orderId) {
                    await fetch(`/api/orders/confirm-cash/${state.orderId}`, { method: 'POST' });
                    toast.success('Zamówienie przy odbiorze zostało potwierdzone');
                }
                dispatch(clearCart());
            } catch (err) {
                console.error(err);
                setError('Wystąpił błąd podczas potwierdzania zamówienia.');
                toast.error('Błąd potwierdzania zamówienia');
            } finally {
                setLoading(false);
            }
        };

        confirmOrder();
    }, [sessionId, state, dispatch]);

    const handleBackToBooks = () => {
        navigate('/booklist');
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="60vh"
            p={2}
        >
            <Paper elevation={3} sx={{ p: 4, maxWidth: 500, textAlign: 'center' }}>
                {loading ? (
                    <>
                        <CircularProgress />
                        <Typography mt={2}>Potwierdzanie zamówienia...</Typography>
                    </>
                ) : error ? (
                    <Typography color="error" variant="h6">
                        {error}
                    </Typography>
                ) : (
                    <>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            Dziękujemy za zakup!
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3 }}>
                            Potwierdzenie zostało wysłane na Twój adres e-mail.
                        </Typography>
                        <Button variant="contained" color="primary" onClick={handleBackToBooks}>
                            Powrót do listy książek
                        </Button>
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default SuccessPage;
