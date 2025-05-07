import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../slices/authSlice';
import { Button, Box } from '@mui/material';

const TestRedux = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <Box sx={{ mb: 2, p: 2, backgroundColor: '#f5f5f5' }}>
      <strong>Redux test:</strong> Zalogowany użytkownik: {user ?? 'Brak'}

      {user && (
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          sx={{ ml: 2 }}
          onClick={() => dispatch(logout())}
        >
          Wyloguj
        </Button>
      )}
    </Box>
  );
};

export default TestRedux;
