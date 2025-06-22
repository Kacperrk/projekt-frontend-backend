export type UserRole = 'USER' | 'ADMIN';

export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';


export interface UserResponse {
  id: number;
  username: string;
  email: string;
  role: UserRole;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  password?: string;
}


export interface BookResponse {
  id: number;
  title: string;
  description?: string;
  price: number;
  stockQuantity: number;
  publishedDate?: string; // YYYY-MM-DD
  coverUrl?: string;
  authorFirstName: string;
  authorLastName: string;
}

export interface CreateBookRequest {
  title: string;
  description?: string;
  price: number;
  stockQuantity: number;
  publishedDate?: string; // YYYY-MM-DD
  coverUrl?: string;
  authorFirstName: string;
  authorLastName: string;
}

export interface UpdateBookRequest {
  title?: string;
  description?: string;
  price?: number;
  stockQuantity?: number;
  publishedDate?: string; // YYYY-MM-DD
  coverUrl?: string;
  authorFirstName?: string;
  authorLastName?: string;
}


export interface OrderResponse {
  id: number;
  userEmail: string;
  orderDate: string; // YYYY-MM-DDTHH:mm:ss
  status: OrderStatus;
  totalPrice: number;
  street: string;
  buildingNumber: string;
  apartmentNumber?: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface CreateOrderRequest {
  userId: number;
  street: string;
  buildingNumber: string;
  apartmentNumber?: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface UpdateOrderRequest {
  street?: string;
  buildingNumber?: string;
  apartmentNumber?: string;
  postalCode?: string;
  city?: string;
  country?: string;
}


export interface OrderItemResponse {
  id: number;
  quantity: number;
  unitPrice: number;
}

export interface CreateOrderItemRequest {
  orderId: number;
  bookId: number;
  quantity: number;
}

export interface UpdateOrderItemRequest {
  orderId?: number;
  bookId?: number;
  quantity?: number;
}