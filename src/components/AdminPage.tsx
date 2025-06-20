import React, { useEffect, useState } from 'react';
import {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
} from '../services/bookService';
import { BookResponse, CreateBookRequest } from '../types';

const AdminPage = () => {
  const [books, setBooks] = useState<BookResponse[]>([]);
  const [title, setTitle] = useState('');
  const [authorFirstName, setAuthorFirstName] = useState('');
  const [authorLastName, setAuthorLastName] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  // Załaduj książki przy starcie
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const all = await getAllBooks();
        setBooks(all);
      } catch (error) {
        console.error('Błąd pobierania książek:', error);
      }
    };

    fetchBooks();
  }, []);

  const resetForm = () => {
    setTitle('');
    setAuthorFirstName('');
    setAuthorLastName('');
    setPrice('');
    setEditId(null);
  };

  const handleAddOrEdit = async () => {
    if (!title || !authorFirstName || !authorLastName || !price) return;

    const book: CreateBookRequest = {
      title,
      authorFirstName,
      authorLastName,
      price: parseFloat(price),
      stockQuantity: 1,
    };

    try {
      if (editId) {
        const updated = await updateBook(editId, book);
        setBooks(prev => prev.map(b => (b.id === editId ? updated : b)));
      } else {
        const created = await createBook(book);
        setBooks(prev => [...prev, created]);
      }

      resetForm();
    } catch (error) {
      console.error('Błąd zapisu książki:', error);
    }
  };

  const handleEdit = (id: number) => {
    const book = books.find(b => b.id === id);
    if (!book) return;

    setTitle(book.title);
    setAuthorFirstName(book.authorFirstName);
    setAuthorLastName(book.authorLastName);
    setPrice(book.price.toString());
    setEditId(book.id);
  };

  const handleRemove = async (id: number) => {
    try {
      await deleteBook(id);
      setBooks(prev => prev.filter(b => b.id !== id));
      if (editId === id) resetForm();
    } catch (error) {
      console.error('Błąd usuwania książki:', error);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 20 }}>
      <h2>Panel administratora</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          placeholder="Tytuł"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          placeholder="Imię autora"
          value={authorFirstName}
          onChange={e => setAuthorFirstName(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          placeholder="Nazwisko autora"
          value={authorLastName}
          onChange={e => setAuthorLastName(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          placeholder="Cena"
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <button
          onClick={handleAddOrEdit}
          disabled={!title || !authorFirstName || !authorLastName || !price}
        >
          {editId ? 'Zapisz zmiany' : 'Dodaj książkę'}
        </button>
        {editId && (
          <button onClick={resetForm} style={{ marginLeft: '10px' }}>
            Anuluj edycję
          </button>
        )}
      </div>

      <h3>Lista książek</h3>
      {books.length === 0 ? (
        <p>Brak książek w bazie danych.</p>
      ) : (
        <ul>
          {books.map(book => (
            <li key={book.id} style={{ marginBottom: '10px' }}>
              <strong>{book.title}</strong> — {book.authorFirstName} {book.authorLastName} — {book.price} zł
              <button onClick={() => handleEdit(book.id)} style={{ marginLeft: '10px' }}>
                Edytuj
              </button>
              <button
                onClick={() => handleRemove(book.id)}
                style={{ marginLeft: '10px', color: 'red' }}
              >
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
