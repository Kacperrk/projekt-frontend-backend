import React from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';

const OrderSummary = () => {
  // Przykładowe dane
  const subtotal = 99.99;
  const shipping = 10.0;
  const total = subtotal + shipping;

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>Podsumowanie zamówienia</Typography>
      <Box display="flex" justifyContent="space-between" my={1}>
        <Typography>Wartość produktów:</Typography>
        <Typography>{subtotal.toFixed(2)} zł</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" my={1}>
        <Typography>Dostawa:</Typography>
        <Typography>{shipping.toFixed(2)} zł</Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">Suma:</Typography>
        <Typography variant="h6">{total.toFixed(2)} zł</Typography>
      </Box>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>Złóż zamówienie</Button>
    </Box>
  );
};

export default OrderSummary;
