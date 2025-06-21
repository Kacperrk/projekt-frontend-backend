import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from './components/NavBar';
import BookList from './components/BookList';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import CartPage from './components/CartPage';
import UserProfile from './components/UserProfile';
import AdminPage from './components/AdminPage';
import PrivateRoute from './components/PrivateRoute';
import { useAppSelector } from './hooks';

const App: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  const user = useAppSelector((state) => state.auth.user);
  const isAdmin = user?.role === 'ADMIN';

  return (
    <>
      <NavBar />

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />}
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                {isAdmin ? <AdminPage /> : <Navigate to="/" replace />}
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>

      <ToastContainer />
    </>
  );
};

export default App;
