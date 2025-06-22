import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchBooks } from '../slices/booksSlice';
import {
  Box,
  Grid,
  Typography,
  Container,
  CircularProgress,
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

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const wordStartsWith = (text: string, query: string) =>
    text
      .toLowerCase()
      .split(/\s+/)
      .some((word) => word.startsWith(query.toLowerCase()));

  const filteredBooks = books
    .filter((book) => {
      const search = searchQuery.trim().toLowerCase();
      if (!search) return !onlyAvailable || book.stockQuantity > 0;

      const matchesTitle = wordStartsWith(book.title, search);
      const matchesAuthor =
        wordStartsWith(book.authorFirstName, search) ||
        wordStartsWith(book.authorLastName, search);

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
                <FlipCard book={book} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default BookList;
