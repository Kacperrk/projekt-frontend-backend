import React from 'react';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';

const sampleBooks = [
  { id: 1, title: 'Wiedźmin', author: 'Andrzej Sapkowski', price: 45 },
  { id: 2, title: 'Lalka', author: 'Bolesław Prus', price: 35 },
  { id: 3, title: 'Pan Tadeusz', author: 'Adam Mickiewicz', price: 30 },
];

const ProductList = () => {
  const dispatch = useDispatch();

  const handleAdd = (book: { id: number; title: string; author: string; price: number }) => {
    dispatch(addToBasket(book));
  };

  return (
    <div>
      <h2>Lista książek</h2>
      <ul>
        {sampleBooks.map((book) => (
          <li key={book.id} style={{ marginBottom: '10px' }}>
            <strong>{book.title}</strong> – {book.author} – {book.price} zł
            <button
              onClick={() => handleAdd(book)}
              style={{ marginLeft: '10px' }}
            >
              Dodaj do koszyka
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
