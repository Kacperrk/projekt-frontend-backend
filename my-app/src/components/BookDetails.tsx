import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { getBookById } from '../services/bookService';
import { BookResponse } from '../types';
import type { AppDispatch } from '../store';
import { useAppSelector } from '../hooks';
import { toast } from 'react-toastify';

const BookDetails: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [book, setBook] = useState<BookResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);

  useEffect(() => {
    const loadBook = async () => {
      try {
        if (id) {
          const fetchedBook = await getBookById(parseInt(id));
          setBook(fetchedBook);
        }
      } catch (error) {
        console.error('Failed to fetch book details', error);
      } finally {
        setLoading(false);
      }
    };
    loadBook();
  }, [id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Zaloguj się, aby dodać do koszyka');
      return;
    }
    if (book) {
      dispatch(addToCart(book));
    }
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

  if (!book) return <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>Book not found</Typography>;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, px: 2 }}>
      <Card sx={{ maxWidth: 900, width: '100%', display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
        <CardMedia
          component="img"
          sx={{ width: isMobile ? '100%' : 300, height: isMobile ? 200 : 'auto', objectFit: 'cover' }}
          image={book.coverUrl || '/placeholder.jpg'}
          alt={book.title}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography gutterBottom variant="h5">
            {book.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            by {book.authorFirstName} {book.authorLastName}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ my: 2 }}>
            {book.description || 'No description available.'}
          </Typography>
          <Typography variant="h6">${book.price.toFixed(2)}</Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddToCart} fullWidth={isMobile}>
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookDetails;