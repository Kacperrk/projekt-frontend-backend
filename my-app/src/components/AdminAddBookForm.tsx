import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid
} from '@mui/material';
import { BookResponse } from '../types';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (book: BookResponse) => void;
}

const AdminAddBookForm: React.FC<Props> = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    authorFirstName: '',
    authorLastName: '',
    price: '',
    coverUrl: '',
    stockQuantity: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setError(null);

    if (!formData.title || !formData.price || !formData.stockQuantity) {
      setError('Wypełnij wymagane pola: tytuł, cena, ilość.');
      return;
    }

    const newBook: BookResponse = {
      id: Date.now(), // tymczasowe ID – backend później nadpisze
      title: formData.title,
      authorFirstName: formData.authorFirstName,
      authorLastName: formData.authorLastName,
      price: parseFloat(formData.price),
      coverUrl: formData.coverUrl,
      stockQuantity: parseInt(formData.stockQuantity) || 0,
    };

    onSubmit(newBook); // teraz: lokalnie / później: backend
    onClose(); // zamknij modal
    setFormData({
      title: '',
      authorFirstName: '',
      authorLastName: '',
      price: '',
      coverUrl: '',
      stockQuantity: '',
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Dodaj książkę</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tytuł *"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Autor - Imię"
              name="authorFirstName"
              value={formData.authorFirstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Autor - Nazwisko"
              name="authorLastName"
              value={formData.authorLastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Cena *"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              inputProps={{ step: '0.01' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Na stanie *"
              name="stockQuantity"
              type="number"
              value={formData.stockQuantity}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="URL do okładki"
              name="coverUrl"
              value={formData.coverUrl}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        {error && (
          <p style={{ color: 'red', marginTop: 10 }}>{error}</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Anuluj</Button>
        <Button onClick={handleSubmit} variant="contained">
          Zapisz
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminAddBookForm;
