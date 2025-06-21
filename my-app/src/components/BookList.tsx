import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchBooks } from '../slices/booksSlice';
import { addToCart } from '../slices/cartSlice';

const BookList: React.FC = () => {
    const dispatch = useAppDispatch();
    const books = useAppSelector(state => state.books.items);
    const booksLoading = useAppSelector(state => state.books.loading);
    const isAuthenticated = useAppSelector(state => state.auth.token !== null);

    useEffect(() => {
        // Fetch books on component mount
        dispatch(fetchBooks());
    }, [dispatch]);

    if (booksLoading) {
        return <p>Loading books...</p>;
    }

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Book List</h2>
            {books.length === 0 ? (
                <p>No books available.</p>
            ) : (
                <table width="100%" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                    <tr style={{ borderBottom: '2px solid #ddd' }}>
                        <th align="left">Title</th>
                        <th align="left">Author</th>
                        <th align="right">Price</th>
                        <th align="center">{isAuthenticated ? 'Add to Cart' : ''}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map(book => (
                        <tr key={book.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td>{book.title}</td>
                            <td>{book.authorFirstName} {book.authorLastName}</td>
                            <td align="right">{book.price.toFixed(2)} zł</td>
                            <td align="center">
                                {isAuthenticated ? (
                                    book.stockQuantity > 0 ? (
                                        <button onClick={() => dispatch(addToCart(book))}>
                                            Add to Cart
                                        </button>
                                    ) : (
                                        <span style={{ color: 'red' }}>Out of stock</span>
                                    )
                                ) : null}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default BookList;
