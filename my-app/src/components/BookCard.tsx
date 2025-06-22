import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import { BookResponse } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addToCart } from '../slices/cartSlice';
import { toast } from 'react-toastify';

interface Props {
  book: BookResponse;
}

const BookCard: React.FC<Props> = ({ book }) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.info('Zaloguj się, aby dodać książkę do koszyka');
      return;
    }

    try {
      await dispatch(addToCart(book)).unwrap();
      toast.success('Dodano do koszyka');
    } catch (err: any) {
      toast.error(`Błąd podczas dodawania: ${err?.message || 'Nieznany błąd'}`);
    }
  };

  const imageSrc = book.coverUrl?.trim()
    ? book.coverUrl
    : `https://picsum.photos/seed/book${book.id}/300/400`;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: 3,
        boxShadow: 3,
        m: 1,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        image={imageSrc}
        alt={book.title}
        sx={{
          height: { xs: 200, sm: 250, md: 300 },
          objectFit: 'cover',
        }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          gutterBottom
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {book.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {book.authorFirstName} {book.authorLastName}
        </Typography>

        <Typography variant="subtitle2" fontWeight="medium" sx={{ mt: 1 }}>
          {book.price.toFixed(2)} zł
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          onClick={handleAddToCart}
          fullWidth
          variant="contained"
          size="small"
          sx={{ textTransform: 'none' }}
        >
          Dodaj do koszyka
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookCard;
