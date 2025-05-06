import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { clearBasket } from '../slices/basketSlice';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, List, ListItem, Divider } from '@mui/material';

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
    <div>
      <Typography variant="h4" gutterBottom>Podsumowanie zamówienia</Typography>

      {products.length === 0 && !confirmed && (
        <Typography>Koszyk jest pusty.</Typography>
      )}

      {confirmed ? (
        <Typography sx={{ mt: 2 }} color="primary">
          <strong>Dziękujemy za zamówienie!</strong> Zostaniesz przekierowany na stronę główną.
        </Typography>
      ) : (
        <>
          <List>
            {products.map(product => (
              <ListItem key={product.id} disableGutters>
                {product.title} – {product.author} – {product.price} zł × {product.quantity}
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography><strong>Razem do zapłaty:</strong> {total} zł</Typography>

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
        </>
      )}
    </div>
  );
};

export default OrderSummary;
