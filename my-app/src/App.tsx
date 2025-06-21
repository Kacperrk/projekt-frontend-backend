import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './hooks';
import NavBar from './components/NavBar';
import BookList from './components/BookList';
import LoginPage from './components/LoginPage';
import CartPage from './components/CartPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const isAuthenticated = useAppSelector(state => state.auth.token !== null);

  return (
      <div>
        {/* Navigation bar */}
        <NavBar />
        {/* Define application routes */}
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
          />
          <Route
              path="/cart"
              element={isAuthenticated ? <CartPage /> : <Navigate to="/login" replace />}
          />
          {/* Redirect any unknown route to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {/* ToastContainer to display notifications */}
        <ToastContainer />
      </div>
  );
};

export default App;
