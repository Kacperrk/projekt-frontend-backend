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

  const handleTabChange = (_: any, newValue: number) => {
    setTab(newValue);
  };

  const renderTable = () => {
    if (tab === 0) {
      return (
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rola</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }

    if (tab === 1) {
      return (
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Tytuł</TableCell>
                <TableCell>Autor</TableCell>
                <TableCell>Cena</TableCell>
                <TableCell>Na stanie</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.id}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>
                    {book.authorFirstName} {book.authorLastName}
                  </TableCell>
                  <TableCell>{book.price.toFixed(2)} zł</TableCell>
                  <TableCell>{book.stockQuantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }

    if (tab === 2) {
      return (
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
          <Table>
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
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.userEmail}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleString()}</TableCell>
                  <TableCell>{order.totalPrice.toFixed(2)} zł</TableCell>
                  <TableCell>{order.city}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }

    return null;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Panel Administratora
      </Typography>

      <Tabs value={tab} onChange={handleTabChange} centered sx={{ mb: 2 }}>
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
