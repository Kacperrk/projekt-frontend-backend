import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchBooks } from '../slices/booksSlice';
import { addToCart } from '../slices/cartSlice';
import {
  Box,
  Grid,
  Typography,
  Container,
  CircularProgress,
  Button,
} from '@mui/material';
import FlipCard from './FlipCard';

const BookList: React.FC = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.items);
  const loading = useAppSelector((state) => state.books.loading);
  const error = useAppSelector((state) => state.books.error);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Box p={3} px={{ xs: 1, sm: 2, md: 3 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          Książki dostępne w katalogu
        </Typography>

        {loading && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}

        {!loading && !error && (
          <Grid container spacing={3} justifyContent="center">
            {books.map((book) => (
              <Grid item xs={12} sm={6} md={4} key={book.id}>
                <FlipCard book={book}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => dispatch(addToCart(book))}
                    sx={{ mt: 2, textTransform: 'none' }}
                  >
                    Dodaj do koszyka
                  </Button>
                </FlipCard>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default BookList;
