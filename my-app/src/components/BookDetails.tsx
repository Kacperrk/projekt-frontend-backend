import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  Rating,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';  // <<< DODANE
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { getBookById } from '../services/bookService';
import { BookResponse } from '../types';
import type { AppDispatch } from '../store';
import { useAppSelector } from '../hooks';
import { toast } from 'react-toastify';
import { useViewedBooks } from '../hooks/useViewedBooks';

type Review = {
  user: string;
  rating: number;
  comment: string;
};

const fakeReviews: Record<string, Review[]> = {
  '1': [
    { user: 'Anna', rating: 4, comment: 'Bardzo ciekawa książka, polecam!' },
    { user: 'Marek', rating: 4, comment: 'Dobrze napisana, choć momentami przewidywalna.' },
  ],
  '2': [
    { user: 'Kasia', rating: 4, comment: 'Świetna lektura na wieczór.' },
    { user: 'Jan', rating: 4, comment: 'Fajne postaci i fabuła.' },
  ],
  default: [
    { user: 'Gość', rating: 4, comment: 'Przyjemna i wciągająca historia.' },
    { user: 'Czytelnik', rating: 4, comment: 'Dobra pozycja, warto przeczytać.' },
  ],
};

const BookDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [book, setBook] = useState<BookResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);

  const [quantity, setQuantity] = useState<number>(1);

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
    loadBook()
        .catch(err => console.error(err));
  }, [id]);

  useViewedBooks(
      book
          ? {
            id: book.id.toString(),
            title: book.title,
            coverUrl: book.coverUrl || `https://picsum.photos/seed/book${book.id}/300/400`,
          }
          : undefined
  );

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Zaloguj się, aby dodać do koszyka');
      return;
    }
    if (book) {
      if (quantity < 1) {
        toast.error('Wybierz ilość co najmniej 1');
        return;
      }
      if (quantity > book.stockQuantity) {
        toast.error(`Nie można dodać więcej niż ${book.stockQuantity} sztuk`);
        return;
      }
      dispatch(addToCart({ book, quantity }));
      toast.success(`Dodano ${quantity} sztuk do koszyka`);
    }
  };

  if (loading) {
    return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
  }

  if (!book) {
    return (
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
          Nie znaleziono książki.
        </Typography>
    );
  }

  const imageSrc = book.coverUrl?.trim() || `https://picsum.photos/seed/book${book.id}/300/400`;

  const reviews = fakeReviews[book.id.toString()] || fakeReviews.default;

  return (
      <>
        {/* PUNKT 3 - PRZYCISK WRÓĆ */}
        <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ ml: 2, mt: 2 }}
        >
          Wróć
        </Button>

        <Box
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              mt: 4,
              px: 2,
              gap: 3,
              justifyContent: 'center',
            }}
        >
          {/* Główna karta z opisem */}
          <Card
              sx={{
                maxWidth: 900,
                width: isMobile ? '100%' : 600,
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

              <Typography variant="body2" color="text.secondary" sx={{ my: 2, whiteSpace: 'pre-line' }}>
                {book.description || 'Brak opisu tej książki.'}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Data wydania: {book.publishedDate || 'brak danych'}
              </Typography>

              <Typography variant="h6" color="primary">
                Cena: {(book.price * quantity).toFixed(2)} zł
              </Typography>

              <Typography color={book.stockQuantity > 0 ? 'success.main' : 'error.main'} sx={{ mb: 2, fontWeight: 'medium' }}>
                {book.stockQuantity > 0 ? `Dostępnych: ${book.stockQuantity} szt.` : 'Niedostępna'}
              </Typography>

              {book.stockQuantity > 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                        disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <Typography>{quantity}</Typography>
                    <Button
                        variant="outlined"
                        onClick={() => setQuantity((prev) => Math.min(book.stockQuantity, prev + 1))}
                        disabled={quantity >= book.stockQuantity}
                    >
                      +
                    </Button>
                  </Box>
              )}

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

          {/* Panel opinii */}
          <Card sx={{ maxWidth: isMobile ? '100%' : 300, boxShadow: 4, p: 2 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Opinie użytkowników
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={4} precision={0.5} readOnly />
              <Typography sx={{ ml: 1 }}>4.0 / 5</Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {reviews.map((rev, idx) => (
                <Box key={idx} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" fontWeight="medium">
                    {rev.user}
                  </Typography>
                  <Rating value={rev.rating} precision={0.5} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary">
                    {rev.comment}
                  </Typography>
                </Box>
            ))}
          </Card>
        </Box>
      </>
  );
};

export default BookDetails;
