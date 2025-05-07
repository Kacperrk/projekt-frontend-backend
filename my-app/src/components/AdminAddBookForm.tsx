// components/AdminPage.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addProduct, removeProduct } from '../slices/productsSlice';
import { Box, Button, TextField, Typography, List, ListItem, ListItemText } from '@mui/material';

const AdminPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');

  const handleAddProduct = () => {
    if (!title || !author || !price) return;

    dispatch(addProduct({
      id: Math.random(),
      title,
      author,
      price: parseFloat(price),
    }));

    setTitle('');
    setAuthor('');
    setPrice('');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Panel administratora</Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField label="Tytuł" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField label="Autor" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <TextField label="Cena" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <Button variant="contained" onClick={handleAddProduct}>Dodaj książkę</Button>
      </Box>

      <Typography variant="h6">Aktualne książki:</Typography>
      <List>
        {products.map((book) => (
          <ListItem
            key={book.id}
            secondaryAction={
              <Button onClick={() => dispatch(removeProduct(book.id))} color="error">
                Usuń
              </Button>
            }
          >
            <ListItemText primary={`${book.title} – ${book.author}`} secondary={`${book.price} zł`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AdminPage;
