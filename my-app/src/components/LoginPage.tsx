import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../slices/authSlice';
import { RootState } from '../store';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state: RootState) => state.users.list);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      setError('Wszystkie pola są wymagane.');
      return;
    }

    // Domyślny admin lub znaleziony użytkownik
    const isAdmin = username === 'admin' && password === 'admin123';
    const matchedUser = users.find(
      (user: any) => user.name === username && user.password === password
    );

    if (isAdmin || matchedUser) {
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
        mt: 8,
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
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Hasło"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Button variant="contained" fullWidth onClick={handleLogin}>
        Zaloguj się
      </Button>
    </Box>
  );
};

export default LoginPage;
