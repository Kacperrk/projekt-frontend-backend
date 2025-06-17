import api from './api';
import { OrderResponse, CreateOrderRequest, UpdateOrderRequest } from '../types';

export const getAllOrders = async (): Promise<OrderResponse[]> => {
    const response = await api.get<OrderResponse[]>('/orders');
    return response.data;
};

export const getOrderById = async (id: number): Promise<OrderResponse> => {
    const response = await api.get<OrderResponse>(`/orders/${id}`);
    return response.data;
};

export const createOrder = async (order: CreateOrderRequest): Promise<OrderResponse> => {
    const response = await api.post<OrderResponse>('/orders', order);
    return response.data;
};

export const updateOrder = async (id: number, order: UpdateOrderRequest): Promise<OrderResponse> => {
    const response = await api.put<OrderResponse>(`/orders/${id}`, order);
    return response.data;
};

export const deleteOrder = async (id: number): Promise<void> => {
    await api.delete(`/orders/${id}`);
};
