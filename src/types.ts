export type UserRole = 'USER' | 'ADMIN';

export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  password?: string; // tylko lokalnie, nie do produkcji
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
  publishedDate?: string;
  coverUrl?: string;
  authorFirstName: string;
  authorLastName: string;
  approved?: boolean;
}

export interface CreateBookRequest extends Omit<BookResponse, 'id'> {}
export interface UpdateBookRequest extends Partial<CreateBookRequest> {}

export interface OrderResponse {
  id: number;
  userEmail: string;
  orderDate: string;
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

export interface BasketProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  authorFirstName: string;
  authorLastName: string;
}

export interface UpdateOrderRequest extends Partial<CreateOrderRequest> {}

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

export interface UpdateOrderItemRequest extends Partial<CreateOrderItemRequest> {}
