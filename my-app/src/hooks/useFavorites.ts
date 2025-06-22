import { useState, useEffect } from 'react';

export type FavoriteBook = {
  id: string;
  title: string;
  coverUrl: string;
};

const STORAGE_KEY = 'favorite_books';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteBook[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const toggleFavorite = (book: FavoriteBook) => {
    const exists = favorites.find((b) => b.id === book.id);
    let updated: FavoriteBook[];

    if (exists) {
      updated = favorites.filter((b) => b.id !== book.id);
    } else {
      updated = [book, ...favorites];
    }

    setFavorites(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const isFavorite = (id: string) => {
    return favorites.some((b) => b.id === id);
  };

  return { favorites, toggleFavorite, isFavorite };
};
