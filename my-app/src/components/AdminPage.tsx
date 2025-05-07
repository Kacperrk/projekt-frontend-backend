import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addProduct, removeProduct } from '../slices/productsSlice';
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    if (!title || !author || !price) return;

    dispatch(
      addProduct({
        id: Date.now(),
        title,
        author,
        price: parseFloat(price),
      })
    );

    setTitle('');
    setAuthor('');
    setPrice('');
  };

  const handleRemove = (id: number) => {
    dispatch(removeProduct(id));
  };

  return (
    <Box sx={{ maxWidth: 500, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        Panel administratora
      </Typography>

      <TextField
        label="Tytuł"
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Autor"
        value={author}
        onChange={e => setAuthor(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Cena"
        type="number"
        value={price}
        onChange={e => setPrice(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button variant="contained" onClick={handleAdd} sx={{ mt: 2 }}>
        Dodaj książkę
      </Button>

      <Typography variant="h5" sx={{ mt: 4 }}>
        Lista książek
      </Typography>

      <List>
        {products.map(book => (
          <ListItem
            key={book.id}
            secondaryAction={
              <IconButton edge="end" onClick={() => handleRemove(book.id)}>
                <DeleteIcon />
              </IconButton>
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
