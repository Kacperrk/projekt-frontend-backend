import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { addBook, removeBook, approveBook } from '../slices/adminProductsSlice';

const AdminPage = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector(state => state.adminProducts.items);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    if (!title || !author || !price) return;

    dispatch(addBook({
      id: Date.now(),
      title,
      author,
      price: parseFloat(price),
    }));

    setTitle('');
    setAuthor('');
    setPrice('');
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2>Panel administratora</h2>

      <div>
        <input
          placeholder="Tytuł"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          placeholder="Autor"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <input
          placeholder="Cena"
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <button onClick={handleAdd} disabled={!title || !author || !price}>
          Dodaj książkę
        </button>
      </div>

      <h3>Lista książek</h3>
      {books.length === 0 ? (
        <p>Brak książek.</p>
      ) : (
        <ul>
          {books.map(book => (
            <li key={book.id}>
              {book.title} – {book.author} – {book.price} zł –
              <button
                onClick={() => dispatch(approveBook(book.id))}
                disabled={book.approved}
              >
                {book.approved ? 'Zatwierdzona' : 'Zatwierdź'}
              </button>
              <button onClick={() => dispatch(removeBook(book.id))}>
                Usuń
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPage;
