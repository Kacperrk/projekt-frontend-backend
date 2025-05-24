import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ProductList from './components/ProductList';
import AdminPage from './components/AdminPage';
import Basket from './components/Basket';
import OrderSummary from './components/OrderSummary';
import PrivateRoute from './components/PrivateRoute';
import RegisterPage from './components/RegisterPage';
import BookDetails from './components/BookDetails';

import { useAppDispatch, useAppSelector } from './hooks';
import { logout } from './slices/authSlice';
import Button from '@mui/material/Button';

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <div style={{ padding: '20px', background: '#111', color: '#fff', minHeight: '100vh' }}>
        <h1>Księgarnia</h1>

        {user && (
          <div style={{ marginBottom: '10px' }}>
            Zalogowany jako: <strong>{user.email}</strong>{' '}
            <Button onClick={() => dispatch(logout())} color="secondary" size="small" variant="outlined">
              Wyloguj
            </Button>
          </div>
        )}

        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '10px', color: '#61dafb' }}>Strona główna</Link>
          <Link to="/login" style={{ marginRight: '10px', color: '#61dafb' }}>Logowanie</Link>
          <Link to="/register" style={{ marginRight: '10px', color: '#61dafb' }}>Rejestracja</Link>
          <Link to="/admin" style={{ marginRight: '10px', color: '#61dafb' }}>Panel admina</Link>
          <Link to="/koszyk" style={{ marginRight: '10px', color: '#61dafb' }}>Koszyk</Link>
          <Link to="/zamowienie" style={{ marginRight: '10px', color: '#61dafb' }}>Zamówienie</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/book/:id" element={<BookDetails />} />

          <Route
            path="/admin"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/koszyk"
            element={
              <PrivateRoute>
                <Basket />
              </PrivateRoute>
            }
          />
          <Route
            path="/zamowienie"
            element={
              <PrivateRoute>
                <OrderSummary />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<div>Strona nie znaleziona</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
