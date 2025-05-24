import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { fetchProducts } from '../slices/productsSlice';
import { Link } from 'react-router-dom';
import { addToBasket } from '../slices/basketSlice';

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.items);
  const loading = useAppSelector(state => state.products.loading);
  const error = useAppSelector(state => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const approvedBooks = products.filter(book => book.approved);

  if (loading) {
    return <div>Ładowanie książek...</div>;
  }

  if (error) {
    return <div>Błąd: {error}</div>;
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20, color: '#fff' }}>
      <h2>Lista książek</h2>

      {approvedBooks.length === 0 ? (
        <p>Brak zatwierdzonych książek.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {approvedBooks.map(book => (
            <li key={book.id} style={{ marginBottom: 15 }}>
              <div>
                <Link to={`/books/${book.id}`} style={{ color: '#90caf9' }}>
                  {book.title} – {book.author} – {book.price} zł
                </Link>
                <button
                  onClick={() => dispatch(addToBasket(book))}
                  style={{
                    marginLeft: 10,
                    padding: '5px 10px',
                    backgroundColor: '#1976d2',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                  }}
                >
                  Dodaj do koszyka
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
