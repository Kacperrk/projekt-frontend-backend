import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Link,
} from '@mui/material';
import { toast } from 'react-toastify';

import { useAppDispatch } from '../hooks';
import { register } from '../slices/authSlice';

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(register(formData)).unwrap();
      toast.success('Rejestracja zakończona sukcesem');
      navigate('/');
    } catch (err: any) {
      toast.error('Rejestracja nie powiodła się');
    }
  };

  return (
      <Container maxWidth="xs" sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Rejestracja
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              fullWidth
              label="Nazwa użytkownika"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
          />
          <TextField
              margin="normal"
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
          />
          <TextField
              margin="normal"
              fullWidth
              label="Hasło"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Zarejestruj się
          </Button>

          <Box mt={2} textAlign="center">
            <Link component={RouterLink} to="/login" variant="body2">
              Masz już konto? Zaloguj się
            </Link>
          </Box>
        </Box>
      </Container>
  );
};

export default RegisterPage;
