import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '../hooks';
import { removeFromCart } from '../slices/cartSlice';
import { BookResponse } from '../types';

const Basket: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const total = cartItems.reduce((sum, item: any) => sum + (item.price || 0), 0);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Koszyk
      </Typography>

      {cartItems.length === 0 ? (
        <Typography>Twój koszyk jest pusty.</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {(cartItems as any[]).map((item, index) => {
              const book = item as Partial<BookResponse>;
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={
                        book.coverUrl ||
                        `https://picsum.photos/seed/book${book.id}/300/400`
                      }
                      alt={book.title}
                    />
                    <CardContent>
                      <Typography variant="h6">{book.title}</Typography>
                      <Typography variant="body2">
                        {book.authorFirstName} {book.authorLastName}
                      </Typography>
                      <Typography variant="body1">
                        Cena: {book.price?.toFixed(2)} zł
                      </Typography>
                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 1 }}
                        onClick={() => book.id && handleRemove(book.id)}
                      >
                        Usuń
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          <Box mt={4}>
            <Typography variant="h6">
              Suma: {total.toFixed(2)} zł
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Przejdź do zamówienia
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Basket;
