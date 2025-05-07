import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../slices/authSlice';

const RegisterPage = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.values(form).some((val) => val.trim() === '')) {
      setError('Wszystkie pola są wymagane.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Hasła nie są identyczne.');
      return;
    }

    setSuccess(true);
    dispatch(login(form.username));
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <Box
      maxWidth={420}
      mx="auto"
      mt={8}
      p={4}
      bgcolor="#1e1e1e"
      borderRadius={3}
      boxShadow={3}
    >
      <Typography variant="h5" mb={2} color="white">
        Rejestracja konta
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Rejestracja zakończona sukcesem!</Alert>}

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Imię"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Nazwisko"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Nazwa użytkownika"
            name="username"
            value={form.username}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Hasło"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Powtórz hasło"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            fullWidth
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Zarejestruj się
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default RegisterPage;
