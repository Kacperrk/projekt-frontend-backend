import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Link,
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { login } from '../slices/authSlice';
import { toast } from 'react-toastify';

import LoginWithGoogle from './LoginWithGoogle';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector((state) => state.auth.loading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(login({ email, password })).unwrap();

      // Zapis do localStorage
      localStorage.setItem('userId', result.user.id.toString());
      localStorage.setItem('userEmail', result.user.email);
      localStorage.setItem('userRole', result.user.role);

      toast.success('Zalogowano pomyślnie');

      if (result.user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      toast.error('Nieprawidłowy email lub hasło');
    }
  };

  return (
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Logowanie
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                label="Hasło"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={loading}
            >
              {loading ? 'Logowanie...' : 'Zaloguj się'}
            </Button>
          </Box>

          <Box mt={2} textAlign="center">
            <Link component={RouterLink} to="/register" variant="body2">
              Nie masz konta? Zarejestruj się
            </Link>
          </Box>

          <Box mt={4} textAlign="center">
            <LoginWithGoogle />
          </Box>
        </Paper>
      </Container>
  );
};

export default LoginPage;
