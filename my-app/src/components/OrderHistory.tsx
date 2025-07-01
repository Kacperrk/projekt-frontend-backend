import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
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

import { getAllOrders } from '../services/orderService';
import { OrderResponse } from '../types';

const OrdersTable: React.FC<{
    orders: OrderResponse[];
    setOrders: React.Dispatch<React.SetStateAction<OrderResponse[]>>;
}> = ({ orders, setOrders }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const EditableRow: React.FC<{ order: OrderResponse }> = ({ order }) => {
        return (
            <TableRow hover>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.userEmail}</TableCell>
                <TableCell>{new Date(order.orderDate).toLocaleString()}</TableCell>
                <TableCell>{order.totalPrice.toFixed(2)} zł</TableCell>
                <TableCell>{order.city}</TableCell>
            </TableRow>
        );
    };

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 440, overflowY: 'auto' }}>
            <Table stickyHeader size={isMobile ? 'small' : 'medium'}>
                <TableHead>
                    <TableRow sx={{ backgroundColor: theme.palette.grey[100] }}>
                        <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Email użytkownika</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Data</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Kwota</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Miasto</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                                Brak zamówień do wyświetlenia
                            </TableCell>
                        </TableRow>
                    ) : (
                        orders.map((o) => <EditableRow key={o.id} order={o} />)
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const OrderHistory: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        // Pobierz userId z localStorage przy pierwszym renderze
        const storedUserId = localStorage.getItem('userId');
        setUserId(storedUserId ? parseInt(storedUserId, 10) : null);
    }, []);

    useEffect(() => {
        if (userId === null) {
            setOrders([]);
            setLoading(false);
            return;
        }

        const loadOrders = async () => {
            setLoading(true);
            try {
                const allOrders = await getAllOrders();
                const filteredOrders = allOrders.filter(order => order.userId === userId);
                setOrders(filteredOrders);
            } catch (error) {
                console.error('Błąd ładowania zamówień:', error);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, [userId]);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ p: isMobile ? 1 : 3 }}>
            <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
                Historia zamówień
            </Typography>

            {loading ? (
                <Box textAlign="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : (
                <OrdersTable orders={orders} setOrders={setOrders} />
            )}
        </Box>
    );
};

export default OrderHistory;
