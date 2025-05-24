import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';
import { fetchProducts } from '../slices/productsSlice';
import { RootState, AppDispatch } from '../store';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.items);
  const loading = useSelector((state: RootState) => state.products.loading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAdd = (book: any) => {
    dispatch(addToBasket(book));
  };

  if (loading) {
    return <div>Ładowanie książek...</div>;
  }

  return (
    <Box
      sx={{
        maxWidth: '1200px',
        mx: 'auto',
        px: 2,
        py: 4,
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Lista książek
      </Typography>

      {products.length === 0 ? (
        <Typography color="text.secondary" align="center">
          Brak dostępnych książek.
        </Typography>
      ) : (
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2} mt={2}>
          {products.map((book) => (
            <Card key={book.id} sx={{ width: 300 }}>
              <CardContent>
                <Typography variant="h6">
                  <Link to={`/book/${book.id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                    {book.title}
                  </Link>
                </Typography>
                <Typography color="text.secondary">{book.author}</Typography>
                <Typography variant="body2">{book.price} zł</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" onClick={() => handleAdd(book)}>
                  Dodaj do koszyka
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProductList;
