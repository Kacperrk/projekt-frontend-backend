// src/types.ts

export interface User {
  id?: number;               // opcjonalne, jeśli chcesz auto-generować
  username: string;          // login użytkownika
  email: string;
  password: string;
  role?: 'admin' | 'user';
  firstName?: string;
  lastName?: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  approved?: boolean;
}

export interface BasketProduct extends Book {
  quantity: number;
}
