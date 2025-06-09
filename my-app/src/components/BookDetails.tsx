import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks';

const BookDetails = () => {
  const { id } = useParams();
  const bookId = parseInt(id || '', 10);

  const book = useAppSelector(state =>
    state.products.items.find(b => b.id === bookId)
  );

  if (!book) {
    return (
      <div style={{ padding: 20, color: '#fff' }}>
        <h2>Książka nie została znaleziona.</h2>
        <p>Sprawdź, czy książka istnieje lub została zatwierdzona.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, color: '#fff' }}>
      <h2>{book.title}</h2>
      <p><strong>Autor:</strong> {book.author}</p>
      <p><strong>Cena:</strong> {book.price} zł</p>
      <p><strong>Status:</strong> {book.approved ? 'Opublikowana' : 'Oczekuje na zatwierdzenie'}</p>
    </div>
  );
};

export default BookDetails;
