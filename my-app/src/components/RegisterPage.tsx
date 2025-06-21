import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.post('http://localhost:8080/api/users', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      navigate('/login');
    } catch (err: any) {
      const backendMsg =
        err?.response?.data?.message || err?.response?.data?.error || err.message;
      alert(`Rejestracja nie powiodła się: ${backendMsg}`);
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

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
          Zarejestruj się
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterPage;
