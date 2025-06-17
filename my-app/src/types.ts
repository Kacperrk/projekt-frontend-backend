export type UserRole = 'USER' | 'ADMIN';

export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';


export interface UserResponse {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  archived: boolean;
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


export interface AuthorResponse {
  id: number;
  firstName: string;
  lastName: string;
  archived: boolean;
}

export interface CreateAuthorRequest {
  firstName: string;
  lastName: string;
}

export interface UpdateAuthorRequest {
  firstName?: string;
  lastName?: string;
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
  archived: boolean;
}

export interface CreateBookRequest {
  title: string;
  description?: string;
  price: number;
  stockQuantity: number;
  publishedDate?: string; // YYYY-MM-DD
  coverUrl?: string;
  authorId: number;
}

export interface UpdateBookRequest {
  title?: string;
  description?: string;
  price?: number;
  stockQuantity?: number;
  publishedDate?: string; // YYYY-MM-DD
  coverUrl?: string;
  authorId?: number;
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
  archived: boolean;
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
  archived: boolean;
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
