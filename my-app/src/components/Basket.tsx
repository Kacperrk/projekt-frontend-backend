import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {
  addToBasket,
  removeFromBasket,
  clearBasket,
  decreaseQuantity,
} from '../slices/basketSlice';
import { Button, Typography } from '@mui/material';

const Basket = () => {
  const products = useSelector((state: RootState) => state.basket.products);
  const total = useSelector((state: RootState) => state.basket.price);
  const dispatch = useDispatch();

  return (
    <div>
      <Typography variant="h4" gutterBottom>Twój koszyk</Typography>

      {products.length === 0 ? (
        <Typography>Koszyk jest pusty.</Typography>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id} style={{ marginBottom: '10px' }}>
              <strong>{product.title}</strong> – {product.author} – {product.price} zł × {product.quantity}

              <Button
                variant="outlined"
                size="small"
                onClick={() => dispatch(decreaseQuantity(product.id))}
                sx={{ ml: 1 }}
              >
                –
              </Button>

              <Button
                variant="outlined"
                size="small"
                onClick={() => dispatch(addToBasket(product))}
                sx={{ ml: 1 }}
              >
                +
              </Button>

              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => dispatch(removeFromBasket(product.id))}
                sx={{ ml: 1 }}
              >
                Usuń
              </Button>
            </li>
          ))}
        </ul>
      )}

      <Typography sx={{ mt: 2 }}><strong>Łącznie:</strong> {total} zł</Typography>

      {products.length > 0 && (
        <Button
          variant="contained"
          color="error"
          onClick={() => dispatch(clearBasket())}
          sx={{ mt: 2 }}
        >
          Wyczyść koszyk
        </Button>
      )}
    </div>
  );
};

export default Basket;
