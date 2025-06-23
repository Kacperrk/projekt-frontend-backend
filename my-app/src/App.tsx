import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Box, Container } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from './components/NavBar';
import BookList from './components/BookList';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import CartPage from './components/CartPage';
import UserProfile from './components/UserProfile';
import AdminPage from './components/AdminPage';
import BookDetails from './components/BookDetails';
import PrivateRoute from './components/PrivateRoute';
import OrderSummary from './components/OrderSummary';
import PaymentPage from './components/PaymentPage';
import { useAppSelector } from './hooks';

import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';
import OAuth2Success from "./components/OAuth2Success";
import SuccessPage from "./components/SuccessPage";
import CancelPage from "./components/CancelPage";

const particlesInit = async (engine: Engine) => {
  await loadFull(engine);
};

const App: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);

  return (
    <>
      <NavBar />

      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true, zIndex: -1 },
          particles: {
            number: { value: 35 },
            color: { value: ['#6C63FF', '#FF6584', '#00B8D9'] },
            shape: { type: 'circle' },
            opacity: { value: 0.2 },
            size: { value: 3 },
            move: { enable: true, speed: 0.4 },
            links: { enable: true, color: '#ccc', opacity: 0.2 },
          },
          background: {
            color: '#f4f6fc',
          },
        }}
      />

      <Box sx={{ minHeight: 'calc(100vh - 64px)', pt: 4, pb: 6 }}>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
              }
            />
            <Route
              path="/register"
              element={
                isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />
              }
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
                  path="/order-summary"
                  element={
                      <PrivateRoute>
                          <OrderSummary />
                      </PrivateRoute>
                  }
              />
              <Route
                  path="/payment"
                  element={
                      <PrivateRoute>
                          <PaymentPage />
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

              <Route path="/oauth2-success" element={<OAuth2Success />} />

              <Route path="/success" element={<SuccessPage />} />
              <Route path="/cancel"  element={<CancelPage />}  />

            <Route
              path="/admin"
              element={
                <PrivateRoute requiredRole="ADMIN">
                  <AdminPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>
      </Box>

      <ToastContainer position="bottom-right" />
    </>
  );
};

export default App;
