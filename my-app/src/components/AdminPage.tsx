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
  Paper,
  Divider,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [success, setSuccess] = useState('');

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

    setSuccess('Dodano książkę!');
    setTimeout(() => setSuccess(''), 2000);

    setTitle('');
    setAuthor('');
    setPrice('');
  };

  const handleRemove = (id: number) => {
    dispatch(removeProduct(id));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 4 }}>
      <Paper sx={{ p: 3, backgroundColor: '#f9f9f9' }} elevation={3}>
        <Typography variant="h4" gutterBottom>
          Panel administratora
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Dodaj nową książkę
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
          label="Cena (zł)"
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
          sx={{ mt: 2 }}
          disabled={!title || !author || !price}
        >
          Dodaj książkę
        </Button>

        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Obecne książki
        </Typography>

        {products.length === 0 ? (
          <Typography color="text.secondary">Brak książek.</Typography>
        ) : (
          <List>
            {products.map(book => (
              <ListItem
                key={book.id}
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleRemove(book.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={`${book.title} – ${book.author}`}
                  secondary={`${book.price.toFixed(2)} zł`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default AdminPage;
