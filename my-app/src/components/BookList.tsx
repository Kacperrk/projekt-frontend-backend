import React, { useEffect, useState } from 'react';
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
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import FlipCard from './FlipCard';

const BookList: React.FC = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.items);
  const loading = useAppSelector((state) => state.books.loading);
  const error = useAppSelector((state) => state.books.error);

  //Lokalny stan UI
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  //Filtrowanie i sortowanie
  const filteredBooks = books
    .filter((book) => {
      const search = searchQuery.toLowerCase();
      const matchesTitle = book.title.toLowerCase().includes(search);
      const matchesAuthor = `${book.authorFirstName} ${book.authorLastName}`.toLowerCase().includes(search);
      const available = onlyAvailable ? book.stockQuantity > 0 : true;
      return (matchesTitle || matchesAuthor) && available;
    })
    .sort((a, b) =>
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );

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

        {/* Panel filtrowania */}
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} mb={4}>
          <TextField
            label="Szukaj książki lub autora"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
          />
          <FormControl sx={{ minWidth: 140 }}>
            <InputLabel>Sortuj po cenie</InputLabel>
            <Select
              value={sortOrder}
              label="Sortuj po cenie"
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            >
              <MenuItem value="asc">Rosnąco</MenuItem>
              <MenuItem value="desc">Malejąco</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
              />
            }
            label="Tylko dostępne"
          />
        </Box>

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
            {filteredBooks.map((book) => (
              <Grid item xs={12} sm={6} md={4} key={book.id}>
                <FlipCard book={book}>
                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 1,
                        color: book.stockQuantity > 0 ? 'success.main' : 'error.main',
                        fontWeight: 'bold',
                      }}
                    >
                      {book.stockQuantity > 0
                        ? `Dostępnych: ${book.stockQuantity} szt.`
                        : 'Niedostępna'}
                    </Typography>

                    <Button
                      variant="contained"
                      fullWidth
                      disabled={book.stockQuantity === 0}
                      onClick={() => dispatch(addToCart(book))}
                      sx={{ textTransform: 'none' }}
                    >
                      Dodaj do koszyka
                    </Button>
                  </Box>
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
