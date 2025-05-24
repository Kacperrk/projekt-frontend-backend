import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { addBook, removeBook, approveBook, updateBook } from '../slices/adminProductsSlice';
import { addProduct, removeProduct } from '../slices/productsSlice';

const AdminPage = () => {
  const dispatch = useAppDispatch();
  const adminBooks = useAppSelector(state => state.adminProducts.items);
  const publicBooks = useAppSelector(state => state.products.items);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const handleAddOrEdit = () => {
    if (!title || !author || !price) return;

    const book = {
      id: editId ?? Date.now(),
      title,
      author,
      price: parseFloat(price),
    };

    if (editId) {
      dispatch(updateBook(book));
    } else {
      dispatch(addBook(book));
    }

    resetForm();
  };

  const handleApprove = (bookId: number) => {
    dispatch(approveBook(bookId));
    const bookToApprove = adminBooks.find(book => book.id === bookId);
    if (bookToApprove) {
      dispatch(addProduct({ ...bookToApprove, approved: true }));
    }
  };

  const handleRemove = (bookId: number) => {
    dispatch(removeBook(bookId));
    if (editId === bookId) {
      resetForm();
    }
  };

  const handleRemovePublic = (bookId: number) => {
    dispatch(removeProduct(bookId));
  };

  const handleEdit = (bookId: number) => {
    const book = adminBooks.find(b => b.id === bookId);
    if (!book) return;
    setTitle(book.title);
    setAuthor(book.author);
    setPrice(book.price.toString());
    setEditId(book.id);
  };

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setPrice('');
    setEditId(null);
  };

  const unapprovedBooks = adminBooks.filter(b => !b.approved);
  const approvedBooks = publicBooks;

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
          placeholder="Autor"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          placeholder="Cena"
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleAddOrEdit} disabled={!title || !author || !price}>
          {editId ? 'Zapisz zmiany' : 'Dodaj książkę'}
        </button>
        {editId && (
          <button onClick={resetForm} style={{ marginLeft: '10px' }}>
            Anuluj edycję
          </button>
        )}
      </div>

      <h3>Do zatwierdzenia</h3>
      {unapprovedBooks.length === 0 ? (
        <p>Brak książek do zatwierdzenia.</p>
      ) : (
        <ul>
          {unapprovedBooks.map(book => (
            <li key={book.id} style={{ marginBottom: '10px' }}>
              <strong>{book.title}</strong> — {book.author} — {book.price} zł
              <button onClick={() => handleApprove(book.id)} style={{ marginLeft: '10px' }}>
                Zatwierdź
              </button>
              <button onClick={() => handleEdit(book.id)} style={{ marginLeft: '10px' }}>
                Edytuj
              </button>
              <button onClick={() => handleRemove(book.id)} style={{ marginLeft: '10px', color: 'red' }}>
                Usuń
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3>Opublikowane książki</h3>
      {approvedBooks.length === 0 ? (
        <p>Brak zatwierdzonych książek.</p>
      ) : (
        <ul>
          {approvedBooks.map(book => (
            <li key={book.id} style={{ marginBottom: '10px' }}>
              <strong>{book.title}</strong> — {book.author} — {book.price} zł
              <button onClick={() => handleRemovePublic(book.id)} style={{ marginLeft: '10px', color: 'red' }}>
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
