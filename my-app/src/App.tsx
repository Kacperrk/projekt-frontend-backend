import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks';
import { logout } from './slices/authSlice';
import Button from '@mui/material/Button';

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProductList from './components/ProductList';
import AdminPage from './components/AdminPage';
import Basket from './components/Basket';
import OrderSummary from './components/OrderSummary';
import BookDetails from './components/BookDetails';

import { usePrivateRoute } from './components/PrivateRoute';

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const requireAuth = usePrivateRoute();

  return (
    <BrowserRouter>
      <div style={{ padding: '20px', background: '#111', color: '#fff', minHeight: '100vh' }}>
        <h1>Księgarnia</h1>

        {user && (
          <div style={{ marginBottom: '10px' }}>
            Zalogowany jako: {user.email}
            <Button onClick={() => dispatch(logout())}>Wyloguj się</Button>
          </div>
        )}

        <nav>
          <Link to="/">Katalog książek</Link> |{" "}
          <Link to="/basket">Koszyk</Link> |{" "}
          {!user && <Link to="/login">Zaloguj się</Link>} |{" "}
          {!user && <Link to="/register">Zarejestruj się</Link>} |{" "}
          {user && <Link to="/admin">Panel Admina</Link>}
        </nav>

        <Routes>
          {/* Publiczne ścieżki */}
          <Route path="/" element={<ProductList />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Chronione ścieżki */}
          <Route path="/admin" element={requireAuth(<AdminPage />)} />
          <Route path="/order-summary" element={requireAuth(<OrderSummary />)} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
