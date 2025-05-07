import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ProductList from './components/ProductList';
import AdminPage from './components/AdminPage';
import Basket from './components/Basket';
import OrderSummary from './components/OrderSummary';
import PrivateRoute from './components/PrivateRoute';
import RegisterPage from './components/RegisterPage';



function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: '20px', background: '#111', color: '#fff', minHeight: '100vh' }}>
        <h1>Księgarnia</h1>

       <nav style={{ marginBottom: '20px' }}>
         <Link to="/" style={{ marginRight: '10px', color: '#61dafb' }}>Strona główna</Link>
         <Link to="/login" style={{ marginRight: '10px', color: '#61dafb' }}>Logowanie</Link>
         <Link to="/admin" style={{ marginRight: '10px', color: '#61dafb' }}>Panel admina</Link>
         <Link to="/koszyk" style={{ marginRight: '10px', color: '#61dafb' }}>Koszyk</Link>
         <Link to="/zamowienie" style={{ marginRight: '10px', color: '#61dafb' }}>Zamówienie</Link>
         <Link to="/register" style={{ marginRight: '10px', color: '#61dafb' }}>Rejestracja</Link>


       </nav>


        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />



          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            }
          />

          <Route path="/koszyk" element={<Basket />} />
          <Route path="/zamowienie" element={<OrderSummary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
