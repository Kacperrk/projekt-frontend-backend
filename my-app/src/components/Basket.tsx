import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {
  addToBasket,
  removeFromBasket,
  clearBasket,
  decreaseQuantity,
} from '../slices/basketSlice';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from '@mui/material';

const Basket = () => {
  const products = useSelector((state: RootState) => state.basket.products);
  const total = useSelector((state: RootState) => state.basket.price);
  const dispatch = useDispatch();

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Twój koszyk
      </Typography>

      {products.length === 0 ? (
        <Typography>Koszyk jest pusty.</Typography>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
          {products.map((product) => (
            <Card key={product.id} sx={{ width: 300 }}>
              <CardContent>
                <Typography variant="h6">{product.title}</Typography>
                <Typography color="text.secondary">{product.author}</Typography>
                <Typography variant="body2">
                  {product.price} zł × {product.quantity}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => dispatch(decreaseQuantity(product.id))}
                >
                  –
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => dispatch(addToBasket(product))}
                >
                  +
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => dispatch(removeFromBasket(product.id))}
                >
                  Usuń
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}

      <Typography sx={{ mt: 3 }} variant="h6">
        Łącznie: {total} zł
      </Typography>

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
    </Box>
  );
};

export default Basket;
