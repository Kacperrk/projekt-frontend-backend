import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchProducts } from '../slices/productsSlice';
import { addToBasket } from '../slices/basketSlice';
import { Link } from 'react-router-dom';

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.items);
  const loading = useAppSelector((state) => state.products.loading);
  const error = useAppSelector((state) => state.products.error);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('titleAsc');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const approvedBooks = products.filter((book) => book.approved);

  const filteredBooks = approvedBooks
    .filter((book) =>
      `${book.title} ${book.author}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOrder) {
        case 'titleAsc':
          return a.title.localeCompare(b.title);
        case 'titleDesc':
          return b.title.localeCompare(a.title);
        case 'priceAsc':
          return a.price - b.price;
        case 'priceDesc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

  return (
    <Box sx={{ px: 2, py: 4, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom align="center">
        Katalog książek
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
        <TextField
          label="Szukaj"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />

        <TextField
          label="Sortuj według"
          select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="titleAsc">Tytuł A-Z</MenuItem>
          <MenuItem value="titleDesc">Tytuł Z-A</MenuItem>
          <MenuItem value="priceAsc">Cena rosnąco</MenuItem>
          <MenuItem value="priceDesc">Cena malejąco</MenuItem>
        </TextField>
      </Box>

      {loading && <Typography>Ładowanie książek...</Typography>}
      {error && <Typography color="error">Błąd: {error}</Typography>}

      {filteredBooks.length === 0 ? (
        <Typography align="center">Brak wyników.</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{book.title}</Typography>
                  <Typography color="text.secondary">{book.author}</Typography>
                  <Typography>{book.price} zł</Typography>
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => dispatch(addToBasket(book))}
                    >
                      Do koszyka
                    </Button>
                    <Button
                      variant="text"
                      size="small"
                      component={Link}
                      to={`/books/${book.id}`}
                    >
                      Szczegóły
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProductList;
