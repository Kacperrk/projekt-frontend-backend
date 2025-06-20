import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material';

import { updateUser } from '../slices/usersSlice';
import { login } from '../slices/authSlice';

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const users = useAppSelector(state => state.users.list);

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      password: user?.password || '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Imię jest wymagane'),
      lastName: Yup.string().required('Nazwisko jest wymagane'),
      email: Yup.string().email('Nieprawidłowy email').required('Email jest wymagany'),
      password: Yup.string().min(6, 'Minimum 6 znaków').required('Hasło jest wymagane'),
    }),
    onSubmit: (values, { setStatus }) => {
      if (!user) return;

      const duplicateEmail = users.some(
        u => u.email === values.email && u.id !== user.id
      );

      if (duplicateEmail) {
        setStatus('Ten email jest już zajęty');
        return;
      }

      const updated = { ...user, ...values };

      dispatch(updateUser(updated));
      dispatch(login(updated));
      setStatus('Dane zostały zaktualizowane');
    },
  });

  if (!user) return null;

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', py: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        Mój profil
      </Typography>

      {formik.status && (
        <Alert
          severity={formik.status === 'Dane zostały zaktualizowane' ? 'success' : 'error'}
          sx={{ mb: 2 }}
        >
          {formik.status}
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label="Imię"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Nazwisko"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Hasło"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained" fullWidth>
          Zapisz zmiany
        </Button>
      </form>
    </Box>
  );
};

export default UserProfile;
