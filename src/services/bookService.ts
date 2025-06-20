import api from './api';
import { BookResponse, CreateBookRequest, UpdateBookRequest } from '../types';

export const getAllBooks = async (): Promise<BookResponse[]> => {
    try {
        const response = await api.get<BookResponse[]>('/books');
        return response.data;
    } catch (error) {
        console.error('Błąd przy pobieraniu książek:', error);
        throw error;
    }
};

export const getBookById = async (id: number): Promise<BookResponse> => {
    try {
        const response = await api.get<BookResponse>(`/books/${id}`);
        return response.data;
    } catch (error) {
        console.error('Błąd przy pobieraniu książki:', error);
        throw error;
    }
};

export const createBook = async (book: CreateBookRequest): Promise<BookResponse> => {
    const response = await api.post<BookResponse>('/books', book);
    return response.data;
};

export const updateBook = async (id: number, book: UpdateBookRequest): Promise<BookResponse> => {
    const response = await api.put<BookResponse>(`/books/${id}`, book);
    return response.data;
};

export const deleteBook = async (id: number): Promise<void> => {
    await api.delete(`/books/${id}`);
};
