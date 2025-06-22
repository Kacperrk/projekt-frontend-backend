import { useEffect } from 'react';

export type ViewedBook = {
  id: string;
  title: string;
  coverUrl: string;
};

const STORAGE_KEY = 'viewed_books';

export const useViewedBooks = (book?: ViewedBook) => {
  useEffect(() => {
    if (!book) return;

    const stored = localStorage.getItem(STORAGE_KEY);
    const existing: ViewedBook[] = stored ? JSON.parse(stored) : [];


    const filtered = existing.filter(b => b.id !== book.id);

    const updated = [book, ...filtered].slice(0, 5);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, [book]);
};

export const getViewedBooks = (): ViewedBook[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};
