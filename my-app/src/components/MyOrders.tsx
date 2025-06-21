import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';

const MyOrders = () => {
  // Przykładowe dane zamówień
  const orders = [
    { id: 1, date: '2024-06-01', total: 89.99 },
    { id: 2, date: '2024-06-10', total: 129.49 },
  ];

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>Moje zamówienia</Typography>
      <Grid container spacing={2}>
        {orders.map(order => (
          <Grid item xs={12} sm={6} key={order.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">Zamówienie #{order.id}</Typography>
                <Typography>Data: {order.date}</Typography>
                <Typography>Kwota: {order.total.toFixed(2)} zł</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyOrders;