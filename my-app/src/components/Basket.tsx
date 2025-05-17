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
    <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2, py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Twój koszyk
      </Typography>

      {products.length === 0 ? (
        <Typography align="center">Koszyk jest pusty.</Typography>
      ) : (
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2} mt={2}>
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

      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        Łącznie: {total} zł
      </Typography>

      {products.length > 0 && (
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="error"
            onClick={() => dispatch(clearBasket())}
            sx={{ mt: 2 }}
          >
            Wyczyść koszyk
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Basket;
