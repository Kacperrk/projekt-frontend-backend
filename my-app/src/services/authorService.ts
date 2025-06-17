import api from './api';
import { AuthorResponse, CreateAuthorRequest, UpdateAuthorRequest } from '../types';

export const getAllAuthors = async (): Promise<AuthorResponse[]> => {
    const response = await api.get<AuthorResponse[]>('/authors');
    return response.data;
};

export const getAuthorById = async (id: number): Promise<AuthorResponse> => {
    const response = await api.get<AuthorResponse>(`/authors/${id}`);
    return response.data;
};

export const createAuthor = async (author: CreateAuthorRequest): Promise<AuthorResponse> => {
    const response = await api.post<AuthorResponse>('/authors', author);
    return response.data;
};

export const updateAuthor = async (id: number, author: UpdateAuthorRequest): Promise<AuthorResponse> => {
    const response = await api.put<AuthorResponse>(`/authors/${id}`, author);
    return response.data;
};

export const deleteAuthor = async (id: number): Promise<void> => {
    await api.delete(`/authors/${id}`);
};
