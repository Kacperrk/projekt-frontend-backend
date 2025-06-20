import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material';

import { login } from '../slices/authSlice';
import { RootState } from '../store';
import { UserResponse } from '../types';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.users.list);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Login jest wymagany'),
      password: Yup.string().required('Hasło jest wymagane'),
    }),
    onSubmit: (values, { setSubmitting, setStatus }) => {
      const { username, password } = values;

      // Logowanie jako admin
      if (username === 'admin' && password === 'admin123') {
        dispatch(
          login({
            id: 0,
            username: 'admin',
            email: 'admin@admin.pl',
            role: 'ADMIN',
          } as UserResponse)
        );
        navigate('/');
        return;
      }

      // Wyszukiwanie zarejestrowanego użytkownika
      const matchedUser = users.find(
        (user: UserResponse) =>
          user.username === username && (user as any).password === password
      );

      if (matchedUser) {
        dispatch(login(matchedUser));
        navigate('/');
      } else {
        setStatus('Nieprawidłowy login lub hasło');
      }

      setSubmitting(false);
    },
  });

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
      <Typography variant="h5" align="center" mb={3}>
        Logowanie do systemu
      </Typography>

      {formik.status && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {formik.status}
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Login"
          name="username"
          fullWidth
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Hasło"
          type="password"
          name="password"
          fullWidth
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={formik.isSubmitting}
        >
          Zaloguj się
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
