import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const UserProfile: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!user) {
    return (
      <Box p={2}>
        <Typography>Nie jesteś zalogowany.</Typography>
      </Box>
    );
  }

  return (
    <Box p={2} display="flex" justifyContent="center">
      <Card sx={{ maxWidth: 400, width: '100%' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Twój profil
          </Typography>
          <Typography><strong>ID:</strong> {user.id}</Typography>
          <Typography><strong>Nazwa użytkownika:</strong> {user.username}</Typography>
          <Typography><strong>Email:</strong> {user.email}</Typography>
          <Typography><strong>Rola:</strong> {user.role}</Typography>
        </CardContent>
        <Box textAlign="center" mb={2}>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Wyloguj się
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default UserProfile;
