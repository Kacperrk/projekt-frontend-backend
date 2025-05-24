import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchProducts } from '../slices/productsSlice';

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.items);
  const loading = useAppSelector(state => state.products.loading);
  const error = useAppSelector(state => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filtrowanie tylko zatwierdzonych książek
  const approvedBooks = products.filter(book => book.approved);

  if (loading) {
    return <div>Ładowanie książek...</div>;
  }

  if (error) {
    return <div>Błąd: {error}</div>;
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2>Lista książek</h2>

      {approvedBooks.length === 0 ? (
        <p>Brak zatwierdzonych książek.</p>
      ) : (
        <ul>
          {approvedBooks.map(book => (
            <li key={book.id}>
              {book.title} – {book.author} – {book.price} zł
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
