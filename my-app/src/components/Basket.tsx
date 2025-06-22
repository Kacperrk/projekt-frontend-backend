import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  useMediaQuery,
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box p={isMobile ? 1 : 4} maxWidth={1200} mx="auto">
      <Typography variant={isMobile ? 'h6' : 'h4'} gutterBottom fontWeight="bold">
        Twój koszyk
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="body1" color="text.secondary" align="center" mt={4}>
          Twój koszyk jest pusty.
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {(cartItems as any[]).map((item, index) => {
              const book = item as Partial<BookResponse>;
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 2,
                      boxShadow: 3,
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'scale(1.03)' },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="180"
                      image={
                        book.coverUrl ||
                        `https://picsum.photos/seed/book${book.id}/300/400`
                      }
                      alt={book.title}
                      sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom noWrap>
                        {book.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {book.authorFirstName} {book.authorLastName}
                      </Typography>
                      <Typography variant="subtitle1" mt={1} fontWeight="medium">
                        Cena: {book.price?.toFixed(2)} zł
                      </Typography>
                      <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        sx={{ mt: 2 }}
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

          <Box
            mt={5}
            p={3}
            textAlign="right"
            boxShadow={3}
            borderRadius={2}
            bgcolor={theme.palette.background.paper}
          >
            <Typography variant={isMobile ? 'h6' : 'h5'} fontWeight="bold">
              Suma: {total.toFixed(2)} zł
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size={isMobile ? 'medium' : 'large'}
              sx={{ mt: 2, px: 4 }}
            >
              Przejdź do zamówienia
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Basket;
