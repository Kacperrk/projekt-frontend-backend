import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { clearBasket } from '../slices/basketSlice';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
} from '@mui/material';

const OrderSummary = () => {
  const products = useSelector((state: RootState) => state.basket.products);
  const total = useSelector((state: RootState) => state.basket.price);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmitOrder = () => {
    setConfirmed(true);
    dispatch(clearBasket());
    setTimeout(() => navigate('/'), 3000);
  };

  return (
    <Box sx={{ maxWidth: '600px', margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Podsumowanie zamówienia
      </Typography>

      {products.length === 0 && !confirmed && (
        <Typography>Koszyk jest pusty.</Typography>
      )}

      {confirmed ? (
        <Typography sx={{ mt: 2 }} color="primary">
          <strong>Dziękujemy za zamówienie!</strong> Zostaniesz przekierowany na stronę główną.
        </Typography>
      ) : (
        <Paper elevation={3} sx={{ padding: 2 }}>
          <List>
            {products.map((product) => (
              <React.Fragment key={product.id}>
                <ListItem disableGutters>
                  <ListItemText
                    primary={`${product.title} – ${product.author}`}
                    secondary={`Cena: ${product.price} zł × ${product.quantity}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Razem do zapłaty: {total} zł
          </Typography>

          {products.length > 0 && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitOrder}
              sx={{ mt: 2 }}
            >
              Złóż zamówienie
            </Button>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default OrderSummary;
