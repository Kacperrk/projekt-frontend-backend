import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../slices/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Walidacja
    if (!username || !password) {
      setError('Wszystkie pola są wymagane.');
      return;
    }

    // Fikcyjna autoryzacja
    if (username === 'admin' && password === 'admin123') {
      dispatch(login(username));
      navigate('/');
    } else {
      setError('Nieprawidłowy login lub hasło.');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 6,
        p: 4,
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" mb={2}>
        Logowanie do systemu
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Login"
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Hasło"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
        Zaloguj się
      </Button>
    </Box>
  );
};

export default LoginPage;
