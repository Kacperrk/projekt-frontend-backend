import React from 'react';
import { render, screen } from '@testing-library/react';
import MyOrders from '../components/MyOrders';

describe('MyOrders', () => {
    test('renders the header', () => {
        render(<MyOrders />);
        expect(screen.getByText(/Moje zamówienia/i)).toBeInTheDocument();
    });

    test('renders the orders with correct data', () => {
        render(<MyOrders />);

        // Sprawdź obecność zamówienia #1
        expect(screen.getByText(/Zamówienie #1/i)).toBeInTheDocument();
        expect(screen.getByText(/Data: 2024-06-01/i)).toBeInTheDocument();
        expect(screen.getByText(/Kwota: 89\.99 zł/i)).toBeInTheDocument();

        // Sprawdź obecność zamówienia #2
        expect(screen.getByText(/Zamówienie #2/i)).toBeInTheDocument();
        expect(screen.getByText(/Data: 2024-06-10/i)).toBeInTheDocument();
        expect(screen.getByText(/Kwota: 129\.49 zł/i)).toBeInTheDocument();
    });
});
