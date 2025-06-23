import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

import AdminUsersTable from './AdminUsersTable';
import { getAllUsers } from '../services/userService';
import { getAllBooks } from '../services/bookService';
import { getAllOrders } from '../services/orderService';

import { UserResponse, BookResponse, OrderResponse } from '../types';

const AdminPage: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState<UserResponse[]>([]);
  const [books, setBooks] = useState<BookResponse[]>([]);
  const [orders, setOrders] = useState<OrderResponse[]>([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [userData, bookData, orderData] = await Promise.all([
          getAllUsers(),
          getAllBooks(),
          getAllOrders(),
        ]);
        setUsers(userData);
        setBooks(bookData);
        setOrders(orderData);
      } catch (error) {
        console.error('Błąd ładowania danych:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  // Prosty komponent tabeli książek
  const BooksTable = () => (
    <TableContainer component={Paper} sx={{ maxHeight: 440, overflowY: 'auto' }}>
      <Table stickyHeader size={isMobile ? 'small' : 'medium'}>
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Tytuł</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Autor</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Cena</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Stan</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                Brak książek do wyświetlenia
              </TableCell>
            </TableRow>
          ) : (
            books.map((book) => (
              <TableRow key={book.id} hover sx={{ cursor: 'pointer' }}>
                <TableCell>{book.id}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{`${book.authorFirstName} ${book.authorLastName}`}</TableCell>
                <TableCell>{book.price.toFixed(2)} zł</TableCell>
                <TableCell>{book.stockQuantity}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const OrdersTable = () => (
    <TableContainer component={Paper} sx={{ maxHeight: 440, overflowY: 'auto' }}>
      <Table stickyHeader size={isMobile ? 'small' : 'medium'}>
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Email użytkownika</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Data</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Kwota</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Miasto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                Brak zamówień do wyświetlenia
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id} hover sx={{ cursor: 'pointer' }}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.userEmail}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{new Date(order.orderDate).toLocaleString()}</TableCell>
                <TableCell>{order.totalPrice.toFixed(2)} zł</TableCell>
                <TableCell>{order.city}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
        Panel Administratora
      </Typography>

      <Tabs
        value={tab}
        onChange={handleTabChange}
        centered={!isMobile}
        variant={isMobile ? 'scrollable' : 'standard'}
        scrollButtons={isMobile ? 'auto' : false}
        sx={{ mb: 3 }}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Użytkownicy" />
        <Tab label="Książki" />
        <Tab label="Zamówienia" />
      </Tabs>

      {loading ? (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {tab === 0 && <AdminUsersTable users={users} />}
          {tab === 1 && <BooksTable />}
          {tab === 2 && <OrdersTable />}
        </>
      )}
    </Box>
  );
};

export default AdminPage;
