import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {
  removeFromBasket,
  updateQuantity,
  clearBasket,
} from '../slices/basketSlice';

import {
  Box,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Basket = () => {
  const dispatch = useDispatch();
  const basket = useSelector((state: RootState) => state.basket.items);

  const handleRemove = (id: number) => {
    dispatch(removeFromBasket(id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const total = basket.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', px: 2, py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Koszyk
      </Typography>

      {basket.length === 0 ? (
        <Typography variant="body1">Twój koszyk jest pusty.</Typography>
      ) : (
        <>
          <List>
            {basket.map((item) => (
              <ListItem key={item.id} sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItemText
                  primary={`${item.title} - ${item.price} zł`}
                  secondary={`Autor: ${item.authorFirstName} ${item.authorLastName}`}
                />
                <TextField
                  type="number"
                  size="small"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  sx={{ width: 80, mr: 2 }}
                />
                <IconButton onClick={() => handleRemove(item.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Suma: {total.toFixed(2)} zł
          </Typography>

          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button variant="outlined" color="secondary" onClick={() => dispatch(clearBasket())}>
              Wyczyść koszyk
            </Button>
            <Button variant="contained" color="primary" href="/order-summary">
              Przejdź do podsumowania
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Basket;
