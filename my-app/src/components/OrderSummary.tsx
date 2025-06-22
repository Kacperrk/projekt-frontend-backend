import React, { useState } from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Button,
    Alert, TextField,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '../hooks';
import { clearCart } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/orderService';

const OrderSummary: React.FC = () => {
    const items = useAppSelector((state) => state.cart.items);
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        street: '',
        buildingNumber: '',
        apartmentNumber: '',
        postalCode: '',
        city: '',
        country: '',
    });

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async () => {
        if (!user) {
            setError('Musisz być zalogowany, aby złożyć zamówienie.');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const orderData = {
                userId: user.id,
                ...form,
            };

            const orderResponse = await createOrder(orderData);

            navigate('/payment', {
                state: {
                    orderId: orderResponse.id,
                    totalPrice: total,
                },
            });

            dispatch(clearCart()); // albo tu albo po platnosci
        } catch (err) {
            console.error(err);
            setError('Wystąpił błąd podczas składania zamówienia');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
            <Typography variant="h4" textAlign="center" gutterBottom>
                Podsumowanie zamówienia
            </Typography>

            <List>
                {items.map((item) => (
                    <ListItem key={item.itemId}>
                        <ListItemText
                            primary={item.title}
                            secondary={`Ilość: ${item.quantity} × $${item.unitPrice.toFixed(2)}`}
                        />
                    </ListItem>
                ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>Dane do wysyłki</Typography>

            <TextField fullWidth label="Ulica" name="street" onChange={handleChange} value={form.street} sx={{ mt: 2 }} />
            <TextField fullWidth label="Numer budynku" name="buildingNumber" onChange={handleChange} value={form.buildingNumber} sx={{ mt: 2 }} />
            <TextField fullWidth label="Numer mieszkania (opcjonalnie)" name="apartmentNumber" onChange={handleChange} value={form.apartmentNumber} sx={{ mt: 2 }} />
            <TextField fullWidth label="Kod pocztowy" name="postalCode" onChange={handleChange} value={form.postalCode} sx={{ mt: 2 }} />
            <TextField fullWidth label="Miasto" name="city" onChange={handleChange} value={form.city} sx={{ mt: 2 }} />
            <TextField fullWidth label="Kraj" name="country" onChange={handleChange} value={form.country} sx={{ mt: 2 }} />

            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

            <Box sx={{ mt: 4, textAlign: 'right' }}>
                <Typography variant="h6">Suma: ${total.toFixed(2)}</Typography>
                <Button
                    variant="contained"
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    sx={{ mt: 2 }}
                >
                    Złóż zamówienie
                </Button>
            </Box>
        </Box>
    );
};

export default OrderSummary;
