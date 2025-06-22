import React from 'react';
import { Link } from 'react-router-dom';
import { BookResponse } from '../types';
import './FlipCard.css';
import { Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

interface Props {
  book: BookResponse;
}

const FlipCard: React.FC<Props> = ({ book }) => {
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
            <br />
            <Button
              variant="outlined"
              component={Link}
              to={`/book/${book.id}`}
              endIcon={<InfoIcon />}
              fullWidth
              sx={{
                mt: 1,
                fontWeight: 'bold',
                textTransform: 'none',
                borderColor: '#1976d2',
                backgroundColor: '#1976d2',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#115293',
                  borderColor: '#115293',
                  color: 'white',
                },
              }}
            >
              Szczegóły
            </Button>
          </div>
        </div>

        {/* BACK */}
        <div className="flip-card-back" style={{ padding: 0 }}>
          <img
            src={imageSrc}
            alt={book.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
