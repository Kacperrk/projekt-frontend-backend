import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Checkbox, FormControlLabel, Button, Alert, Box } from '@mui/material';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../slices/usersSlice';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(2, 'Za krótkie imię').required('Imię jest wymagane'),
    email: Yup.string().email('Nieprawidłowy email').required('Email jest wymagany'),
    password: Yup.string().min(6, 'Min. 6 znaków').required('Hasło jest wymagane'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Hasła muszą się zgadzać')
      .required('Potwierdzenie hasła jest wymagane'),
    terms: Yup.boolean().oneOf([true], 'Musisz zaakceptować regulamin'),
  });

  const handleSubmit = (values: typeof initialValues) => {
    dispatch(addUser({ name: values.name, email: values.email }));
    navigate('/login');
  };

  return (
    <Box maxWidth={400} mx="auto" mt={5}>
      <h2>Rejestracja</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              name="name"
              label="Imię"
              fullWidth
              margin="normal"
              error={touched.name && !!errors.name}
              helperText={<ErrorMessage name="name" />}
            />

            <Field
              as={TextField}
              name="email"
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              error={touched.email && !!errors.email}
              helperText={<ErrorMessage name="email" />}
            />

            <Field
              as={TextField}
              name="password"
              label="Hasło"
              type="password"
              fullWidth
              margin="normal"
              error={touched.password && !!errors.password}
              helperText={<ErrorMessage name="password" />}
            />

            <Field
              as={TextField}
              name="confirmPassword"
              label="Potwierdź hasło"
              type="password"
              fullWidth
              margin="normal"
              error={touched.confirmPassword && !!errors.confirmPassword}
              helperText={<ErrorMessage name="confirmPassword" />}
            />

            <FormControlLabel
              control={<Field as={Checkbox} name="terms" />}
              label="Akceptuję regulamin"
            />

            <ErrorMessage name="terms">
              {msg => <Alert severity="error">{msg}</Alert>}
            </ErrorMessage>

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Zarejestruj się
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterPage;
