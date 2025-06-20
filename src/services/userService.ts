import api from './api';
import { UserResponse, CreateUserRequest, UpdateUserRequest } from '../types';

export const getAllUsers = async (): Promise<UserResponse[]> => {
    try {
        const response = await api.get<UserResponse[]>('/users');
        return response.data;
    } catch (error) {
        console.error('Błąd przy pobieraniu użytkowników:', error);
        throw error;
    }
};

export const getUserById = async (id: number): Promise<UserResponse> => {
    try {
        const response = await api.get<UserResponse>(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Błąd przy pobieraniu użytkownika o ID ${id}:`, error);
        throw error;
    }
};

export const createUser = async (user: CreateUserRequest): Promise<UserResponse> => {
    const response = await api.post<UserResponse>('/users', user);
    return response.data;
};

export const updateUser = async (id: number, user: UpdateUserRequest): Promise<UserResponse> => {
    const response = await api.put<UserResponse>(`/users/${id}`, user);
    return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
};
