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
          <h3>{book.title}</h3>
          <p>Czekam na Twoje zamówienie!</p>
          {children}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
