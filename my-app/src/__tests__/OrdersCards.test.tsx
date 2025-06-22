import React from 'react';
import { render, screen } from '@testing-library/react';
import OrdersCards from '../components/OrdersCards';

const ordersMock = [
    {
        id: 1,
        userEmail: 'user1@example.com',
        status: 'Pending',
        orderDate: '2024-06-15T12:00:00Z',
        totalPrice: 150.5,
        city: 'Warszawa',
    },
    {
        id: 2,
        userEmail: 'user2@example.com',
        status: 'Completed',
        orderDate: '2024-05-20T08:30:00Z',
        totalPrice: 99.99,
        city: 'Kraków',
    },
];

describe('OrdersCards', () => {
    test('renders message when no orders', () => {
        render(<OrdersCards orders={[]} />);
        expect(screen.getByText(/Brak zamówień do wyświetlenia/i)).toBeInTheDocument();
    });

    test('renders all orders with correct data', () => {
        render(<OrdersCards orders={ordersMock} />);

        // Sprawdź, czy oba zamówienia są obecne
        expect(screen.getByText(/Zamówienie #1/i)).toBeInTheDocument();
        expect(screen.getByText(/Zamówienie #2/i)).toBeInTheDocument();

        // Sprawdź dane dla pierwszego zamówienia
        expect(screen.getByText(/user1@example.com/i)).toBeInTheDocument();
        expect(screen.getByText(/Warszawa/i)).toBeInTheDocument();
        expect(screen.getByText(/Kwota: 150\.50 zł/i)).toBeInTheDocument();
        expect(screen.getByText(/Pending/i)).toBeInTheDocument();

        // Sprawdź dane dla drugiego zamówienia
        expect(screen.getByText(/user2@example.com/i)).toBeInTheDocument();
        expect(screen.getByText(/Kraków/i)).toBeInTheDocument();
        expect(screen.getByText(/Kwota: 99\.99 zł/i)).toBeInTheDocument();
        expect(screen.getByText(/Completed/i)).toBeInTheDocument();

        // Sprawdź, czy daty są poprawnie sformatowane (locale może się różnić, ale zwykle jest dzień/miesiąc/rok)
        const firstOrderDate = new Date(ordersMock[0].orderDate).toLocaleDateString();
        expect(screen.getByText(new RegExp(firstOrderDate))).toBeInTheDocument();

        const secondOrderDate = new Date(ordersMock[1].orderDate).toLocaleDateString();
        expect(screen.getByText(new RegExp(secondOrderDate))).toBeInTheDocument();
    });
});
