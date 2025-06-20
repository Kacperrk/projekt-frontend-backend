import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const MyOrders = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const orders = useSelector((state: RootState) => state.orders.list);

  if (!user) return null;

  const userOrders = orders
    .filter(order => order.userId === user.id)
    .sort((a, b) => b.id - a.id);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', px: 2, py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Moje zamówienia
      </Typography>

      {userOrders.length === 0 ? (
        <Typography align="center">Brak zamówień.</Typography>
      ) : (
        userOrders.map(order => (
          <Paper key={order.id} sx={{ mb: 3, p: 2 }}>
            <Typography variant="h6">Zamówienie z dnia: {order.date}</Typography>
            <List dense>
              {order.items.map(item => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={`Produkt ID: ${item.id} (${item.quantity} × ${item.unitPrice} zł)`}
                    secondary={`Suma: ${(item.quantity * item.unitPrice).toFixed(2)} zł`}
                  />
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body1" align="right">
              Razem: <strong>{order.total.toFixed(2)} zł</strong>
            </Typography>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default MyOrders;
