import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material';
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
      } catch (err) {
        console.error('Błąd ładowania danych:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const renderTable = () => {
    const size: 'small' | 'medium' = isMobile ? 'small' : 'medium';

    if (tab === 0) {
      return (
        <TableContainer component={Paper} sx={{ maxHeight: 440, overflowY: 'auto' }}>
          <Table stickyHeader size={size}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rola</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                    Brak użytkowników do wyświetlenia
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id} hover sx={{ cursor: 'pointer' }}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }

    if (tab === 1) {
      return (
        <TableContainer component={Paper} sx={{ maxHeight: 440, overflowY: 'auto' }}>
          <Table stickyHeader size={size}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Tytuł</TableCell>
                <TableCell>Autor</TableCell>
                <TableCell>Cena</TableCell>
                <TableCell>Stan</TableCell>
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
                    <TableCell>
                      {book.authorFirstName} {book.authorLastName}
                    </TableCell>
                    <TableCell>{book.price.toFixed(2)} zł</TableCell>
                    <TableCell>{book.stockQuantity}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }

    if (tab === 2) {
      return (
        <TableContainer component={Paper} sx={{ maxHeight: 440, overflowY: 'auto' }}>
          <Table stickyHeader size={size}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Email użytkownika</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Kwota</TableCell>
                <TableCell>Miasto</TableCell>
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
    }

    return null;
  };

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
        renderTable()
      )}
    </Box>
  );
};

export default AdminPage;
