import React from 'react';
import { BookResponse } from '../types';
import './FlipCard.css';

interface Props {
  book: BookResponse;
  children?: React.ReactNode;
}

const FlipCard: React.FC<Props> = ({ book, children }) => {
  const imageSrc = book.coverUrl?.trim()
    ? book.coverUrl
    : `https://picsum.photos/seed/book${book.id}/300/400`;

  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        {/* FRONT */}
        <div className="flip-card-front">
          <img src={imageSrc} alt={book.title} />
          <div className="flip-title">
            <strong>{book.title}</strong>
            <br />
            {book.authorFirstName} {book.authorLastName}
            <br />
            {book.price.toFixed(2)} zł
          </div>
        </div>

        {/* BACK */}
        <div className="flip-card-back">
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>{book.title}</h3>
          <p
            style={{
              fontSize: '0.85rem',
              color: '#333',
              padding: '0 1rem',
              maxHeight: '160px',
              overflowY: 'auto',
              textAlign: 'justify',
              lineHeight: '1.4',
            }}
          >
            {book.description || 'Brak opisu dla tej książki.'}
          </p>
          <div style={{ marginTop: 'auto', width: '100%' }}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
