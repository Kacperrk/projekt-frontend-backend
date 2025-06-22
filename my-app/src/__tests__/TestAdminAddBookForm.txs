import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminAddBookForm from '../components/AdminAddBookForm';
import '@testing-library/jest-dom';

describe('AdminAddBookForm', () => {
    const setup = (propsOverride = {}) => {
        const onClose = jest.fn();
        const onSubmit = jest.fn();
        const props = {
            open: true,
            onClose,
            onSubmit,
            ...propsOverride,
        };

        render(<AdminAddBookForm {...props} />);
        return { onClose, onSubmit };
    };

    test('renderuje wszystkie pola formularza', () => {
        setup();

        expect(screen.getByLabelText(/tytuł/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/autor - imię/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/autor - nazwisko/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/cena/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/na stanie/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/url do okładki/i)).toBeInTheDocument();
    });

    test('kliknięcie "Anuluj" wywołuje onClose', () => {
        const { onClose } = setup();

        fireEvent.click(screen.getByText(/anuluj/i));
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    test('waliduje wymagane pola i pokazuje błąd', () => {
        setup();

        fireEvent.click(screen.getByText(/zapisz/i));
        expect(screen.getByText(/wypełnij wymagane pola/i)).toBeInTheDocument();
    });

    test('wysyła poprawne dane i czyści formularz', async () => {
        const user = userEvent.setup();
        const { onSubmit, onClose } = setup();

        await user.type(screen.getByLabelText(/tytuł/i), 'Nowa Książka');
        await user.type(screen.getByLabelText(/autor - imię/i), 'Jan');
        await user.type(screen.getByLabelText(/autor - nazwisko/i), 'Kowalski');
        await user.type(screen.getByLabelText(/cena/i), '39.99');
        await user.type(screen.getByLabelText(/na stanie/i), '10');
        await user.type(screen.getByLabelText(/url do okładki/i), 'http://example.com/cover.jpg');

        fireEvent.click(screen.getByText(/zapisz/i));

        expect(onSubmit).toHaveBeenCalledTimes(1);
        const submittedBook = onSubmit.mock.calls[0][0];

        expect(submittedBook.title).toBe('Nowa Książka');
        expect(submittedBook.authorFirstName).toBe('Jan');
        expect(submittedBook.authorLastName).toBe('Kowalski');
        expect(submittedBook.price).toBeCloseTo(39.99);
        expect(submittedBook.coverUrl).toBe('http://example.com/cover.jpg');
        expect(submittedBook.stockQuantity).toBe(10);

        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
