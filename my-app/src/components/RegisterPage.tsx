import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Grid from '@mui/material/Grid'; // WAŻNE: poprawny import!
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material';

import { addUser } from '../slices/usersSlice';
import { RootState } from '../store';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.users.list);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Imię jest wymagane'),
      lastName: Yup.string().required('Nazwisko jest wymagane'),
      username: Yup.string()
        .min(3, 'Minimum 3 znaki')
        .required('Login jest wymagany'),
      email: Yup.string()
        .email('Nieprawidłowy email')
        .required('Email jest wymagany'),
      password: Yup.string()
        .min(6, 'Minimum 6 znaków')
        .required('Hasło jest wymagane'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Hasła muszą być takie same')
        .required('Potwierdź hasło'),
    }),
    onSubmit: (values, { setStatus }) => {
      const userExists = users.some((u) => u.name === values.username);

      if (userExists) {
        setStatus('Użytkownik o tym loginie już istnieje');
        return;
      }

      dispatch(
        addUser({
          name: values.username,
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
        })
      );

      navigate('/login');
    },
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Box
        sx={{
          maxWidth: 500,
          width: '100%',
          p: 4,
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" align="center" mb={3}>
          Rejestracja
        </Typography>

        {formik.status && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formik.status}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Imię"
                name="firstName"
                fullWidth
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nazwisko"
                name="lastName"
                fullWidth
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Login"
                name="username"
                fullWidth
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Hasło"
                name="password"
                type="password"
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Potwierdź hasło"
                name="confirmPassword"
                type="password"
                fullWidth
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
          >
            Zarejestruj się
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default RegisterPage;
