import React from 'react';
import { render, screen } from '@testing-library/react';
import OrderSummary from '../components/OrderSummary';

describe('OrderSummary', () => {
    test('renders the header', () => {
        render(<OrderSummary />);
        expect(screen.getByText(/Podsumowanie zamówienia/i)).toBeInTheDocument();
    });

    test('displays correct subtotal, shipping, and total', () => {
        render(<OrderSummary />);
        expect(screen.getByText('Wartość produktów:')).toBeInTheDocument();
        expect(screen.getByText('99.99 zł')).toBeInTheDocument();

        expect(screen.getByText('Dostawa:')).toBeInTheDocument();
        expect(screen.getByText('10.00 zł')).toBeInTheDocument();

        expect(screen.getByText('Suma:')).toBeInTheDocument();
        expect(screen.getByText('109.99 zł')).toBeInTheDocument();
    });

    test('renders the submit order button', () => {
        render(<OrderSummary />);
        expect(screen.getByRole('button', { name: /Złóż zamówienie/i })).toBeInTheDocument();
    });
});
