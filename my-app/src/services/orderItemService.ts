import api from './api';
import { OrderItemResponse, CreateOrderItemRequest, UpdateOrderItemRequest } from '../types';

export const getAllOrderItems = async (): Promise<OrderItemResponse[]> => {
    try {
        const response = await api.get<OrderItemResponse[]>('/order-items');
        return response.data;
    } catch (error) {
        console.error('Błąd przy pobieraniu pozycji zamówień:', error);
        throw error;
    }
};

export const getOrderItemById = async (id: number): Promise<OrderItemResponse> => {
    try {
        const response = await api.get<OrderItemResponse>(`/order-items/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Błąd przy pobieraniu pozycji zamówienia o ID ${id}:`, error);
        throw error;
    }
};

export const createOrderItem = async (item: CreateOrderItemRequest): Promise<OrderItemResponse> => {
    const response = await api.post<OrderItemResponse>('/order-items', item);
    return response.data;
};

export const updateOrderItem = async (id: number, item: UpdateOrderItemRequest): Promise<OrderItemResponse> => {
    const response = await api.put<OrderItemResponse>(`/order-items/${id}`, item);
    return response.data;
};

export const deleteOrderItem = async (id: number): Promise<void> => {
    await api.delete(`/order-items/${id}`);
};
