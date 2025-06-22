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
        console.error('Błąd przy pobieraniu szczegółów książki:', error);
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
      toast.success('Dodano do koszyka');
    }
  };

  if (loading)
    return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

  if (!book)
    return (
      <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
        Nie znaleziono książki.
      </Typography>
    );

  const imageSrc =
    book.coverUrl?.trim() ||
    `https://picsum.photos/seed/book${book.id}/300/400`;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, px: 2 }}>
      <Card
        sx={{
          maxWidth: 900,
          width: '100%',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          boxShadow: 4,
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: isMobile ? '100%' : 300,
            height: isMobile ? 250 : 'auto',
            objectFit: 'cover',
          }}
          image={imageSrc}
          alt={book.title}
        />
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography gutterBottom variant="h5" fontWeight="bold">
            {book.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {book.authorFirstName} {book.authorLastName}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ my: 2, whiteSpace: 'pre-line' }}
          >
            {book.description || 'Brak opisu tej książki.'}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Data wydania:{' '}
            {book.publishedDate || 'brak danych'}
          </Typography>

          <Typography variant="h6" color="primary">
            Cena: {book.price.toFixed(2)} zł
          </Typography>

          <Typography
            color={book.stockQuantity > 0 ? 'success.main' : 'error.main'}
            sx={{ mb: 2, fontWeight: 'medium' }}
          >
            {book.stockQuantity > 0
              ? `Dostępnych: ${book.stockQuantity} szt.`
              : '⛔ Niedostępna'}
          </Typography>

          <Button
            variant="contained"
            onClick={handleAddToCart}
            disabled={book.stockQuantity === 0}
            fullWidth={isMobile}
            sx={{ mt: 'auto' }}
          >
            Dodaj do koszyka
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookDetails;
