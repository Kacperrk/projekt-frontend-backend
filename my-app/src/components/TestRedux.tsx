import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { logout } from '../slices/authSlice';
import { Button, Box } from '@mui/material';

const TestRedux: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box sx={{ mb: 2, p: 2, backgroundColor: '#f5f5f5' }}>
      <>
        <strong>Redux test:</strong> Zalogowany użytkownik: {user?.email ?? 'Brak'}
        {user && (
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            sx={{ ml: 2, display: 'block', mt: 1 }}
            onClick={handleLogout}
          >
            Wyloguj
          </Button>
        )}
      </>
    </Box>
  );
};

export default TestRedux;
