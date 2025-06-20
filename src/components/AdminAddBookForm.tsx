import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addProduct, updateProduct, removeProduct } from '../slices/productsSlice';
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
import EditIcon from '@mui/icons-material/Edit';

const AdminAddBookForm = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);

  const [title, setTitle] = useState('');
  const [authorFirstName, setAuthorFirstName] = useState('');
  const [authorLastName, setAuthorLastName] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const resetForm = () => {
    setTitle('');
    setAuthorFirstName('');
    setAuthorLastName('');
    setPrice('');
    setEditId(null);
  };

  const handleSubmit = () => {
    if (!title || !authorFirstName || !authorLastName || !price) return;

    const book = {
      id: editId ?? Date.now(),
      title,
      price: parseFloat(price),
      stockQuantity: 1, // domyślna wartość, możesz zmienić
      authorFirstName,
      authorLastName,
    };

    if (editId) {
      dispatch(updateProduct(book));
    } else {
      dispatch(addProduct(book));
    }

    resetForm();
  };

  const handleEdit = (id: number) => {
    const book = products.find(p => p.id === id);
    if (book) {
      setTitle(book.title);
      setAuthorFirstName(book.authorFirstName);
      setAuthorLastName(book.authorLastName);
      setPrice(book.price.toString());
      setEditId(book.id);
    }
  };

  const handleRemove = (id: number) => {
    dispatch(removeProduct(id));
    if (editId === id) resetForm();
  };

  return (
    <Box sx={{ maxWidth: 500, margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        {editId ? 'Edytuj książkę' : 'Dodaj książkę'}
      </Typography>

      <TextField
        label="Tytuł"
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Imię autora"
        value={authorFirstName}
        onChange={e => setAuthorFirstName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Nazwisko autora"
        value={authorLastName}
        onChange={e => setAuthorLastName(e.target.value)}
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

      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        {editId ? 'Zapisz zmiany' : 'Dodaj książkę'}
      </Button>

      <Typography variant="h6" sx={{ mt: 4 }}>
        Lista książek
      </Typography>

      <List>
        {products.map(book => (
          <ListItem
            key={book.id}
            secondaryAction={
              <>
                <IconButton onClick={() => handleEdit(book.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleRemove(book.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={`${book.title} – ${book.authorFirstName} ${book.authorLastName}`}
              secondary={`${book.price} zł`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AdminAddBookForm;
