import React from 'react';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
}

const sampleBooks: Book[] = [
  { id: 1, title: 'Wiedźmin', author: 'Andrzej Sapkowski', price: 45 },
  { id: 2, title: 'Lalka', author: 'Bolesław Prus', price: 35 },
  { id: 3, title: 'Pan Tadeusz', author: 'Adam Mickiewicz', price: 30 },
];

const ProductList: React.FC = () => {
  const dispatch = useDispatch();

  const handleAdd = (book: Book) => {
    dispatch(addToBasket(book));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Lista książek
      </Typography>

      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        justifyContent="center"
      >
        {sampleBooks.map((book) => (
          <Card key={book.id} sx={{ width: 300 }}>
            <CardContent>
              <Typography variant="h6">{book.title}</Typography>
              <Typography color="text.secondary">{book.author}</Typography>
              <Typography variant="body2">{book.price} zł</Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                onClick={() => handleAdd(book)}
              >
                Dodaj do koszyka
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ProductList;
