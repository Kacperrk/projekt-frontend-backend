import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks';
import { login, logout } from './slices/authSlice';
import Button from '@mui/material/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AdminPage from './components/AdminPage';
import UserProfile from './components/UserProfile';
import MyOrders from './components/MyOrders';

import { usePrivateRoute } from './components/PrivateRoute';

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth?.user);
  const requireAuth = usePrivateRoute();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch(login(parsedUser));
      } catch (err) {
        console.error('Nieprawidłowy zapis użytkownika w localStorage.');
      }
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div style={{ padding: '20px', background: '#111', color: '#fff', minHeight: '100vh' }}>
        <h1>Księgarnia</h1>

        {user && (
          <div style={{ marginBottom: '10px' }}>
            Zalogowany jako: {user.email} ({user.role})
            <Button onClick={() => dispatch(logout())} style={{ marginLeft: '10px' }} variant="outlined">
              Wyloguj się
            </Button>
          </div>
        )}

        <nav style={{ marginBottom: '20px' }}>
          {!user && <Link to="/login">Zaloguj się</Link>} |{" "}
          {!user && <Link to="/register">Zarejestruj się</Link>} |{" "}
          {user?.role === 'ADMIN' && <Link to="/admin">Panel Admina</Link>} |{" "}
          {user && <Link to="/profile">Mój profil</Link>} |{" "}
          {user && <Link to="/orders">Moje zamówienia</Link>}
        </nav>

        <Routes>
          {/* Publiczne ścieżki */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Chronione ścieżki */}
          <Route path="/admin" element={requireAuth(<AdminPage />, { onlyAdmin: true })} />
          <Route path="/profile" element={requireAuth(<UserProfile />)} />
          <Route path="/orders" element={requireAuth(<MyOrders />)} />
        </Routes>

        <ToastContainer position="top-right" autoClose={4000} />
      </div>
    </BrowserRouter>
  );
}

export default App;
