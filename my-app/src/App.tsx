import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks';
import { login, logout } from './slices/authSlice';
import Button from '@mui/material/Button';

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProductList from './components/ProductList';
import AdminPage from './components/AdminPage';
import Basket from './components/Basket';
import OrderSummary from './components/OrderSummary';
import BookDetails from './components/BookDetails';
import UserProfile from './components/UserProfile';
import MyOrders from './components/MyOrders'; //

import { usePrivateRoute } from './components/PrivateRoute';

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
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
            <Button onClick={() => dispatch(logout())} style={{ marginLeft: '10px' }}>
              Wyloguj się
            </Button>
          </div>
        )}

        <nav>
          <Link to="/">Katalog książek</Link> |{" "}
          <Link to="/basket">Koszyk</Link> |{" "}
          {!user && <Link to="/login">Zaloguj się</Link>} |{" "}
          {!user && <Link to="/register">Zarejestruj się</Link>} |{" "}
          {user?.role === 'admin' && <Link to="/admin">Panel Admina</Link>} |{" "}
          {user && <Link to="/profile">Mój profil</Link>} |{" "}
          {user && <Link to="/orders">Moje zamówienia</Link>}
        </nav>

        <Routes>
          {/* Publiczne ścieżki */}
          <Route path="/" element={<ProductList />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Chronione ścieżki */}
          <Route path="/admin" element={requireAuth(<AdminPage />, { onlyAdmin: true })} />
          <Route path="/order-summary" element={requireAuth(<OrderSummary />)} />
          <Route path="/profile" element={requireAuth(<UserProfile />)} />
          <Route path="/orders" element={requireAuth(<MyOrders />)} /> {/*  */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
