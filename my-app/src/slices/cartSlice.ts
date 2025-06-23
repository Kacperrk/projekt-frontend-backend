import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  BookResponse,
  CreateOrderRequest,
  CreateOrderItemRequest,
  UpdateOrderItemRequest,
  OrderResponse,
  OrderItemResponse
} from '../types';
import * as orderService from '../services/orderService';
import * as orderItemService from '../services/orderItemService';
import type { RootState } from '../store';

interface CartItem {
  itemId: number;
  bookId: number;
  title: string;
  quantity: number;
  unitPrice: number;
}

interface CartState {
  orderId: number | null;
  items: CartItem[];
}

const initialState: CartState = {
  orderId: null,
  items: []
};

export const addToCart = createAsyncThunk<
  { orderId: number; item: CartItem },
  BookResponse,
  { state: RootState }
>('cart/addItem', async (book, { getState, rejectWithValue }) => {
  const state = getState();
  try {
    let currentOrderId = state.cart.orderId;
    const userId = state.auth.user?.id;
    if (!userId) throw new Error('User not logged in');

    if (!currentOrderId) {
      const newOrder: CreateOrderRequest = {
        userId,
        street: 'N/A',
        buildingNumber: 'N/A',
        postalCode: 'N/A',
        city: 'N/A',
        country: 'N/A'
      };
      const createdOrder: OrderResponse = await orderService.createOrder(newOrder);
      currentOrderId = createdOrder.id;
    }

    const existing = state.cart.items.find(it => it.bookId === book.id);
    let itemResult: OrderItemResponse;

    if (existing) {
      const update: UpdateOrderItemRequest = {
        bookId: book.id,
        orderId: currentOrderId,
        quantity: existing.quantity + 1,
      };
      itemResult = await orderItemService.updateOrderItem(existing.itemId, update);
    } else {
      const create: CreateOrderItemRequest = {
        orderId: currentOrderId,
        bookId: book.id,
        quantity: 1
      };
      itemResult = await orderItemService.createOrderItem(create);
    }

    const item: CartItem = {
      itemId: itemResult.id,
      bookId: book.id,
      title: book.title,
      quantity: itemResult.quantity,
      unitPrice: itemResult.unitPrice
    };

    return { orderId: currentOrderId, item };
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const removeFromCart = createAsyncThunk<number, number>(
  'cart/removeItem',
  async (itemId, { rejectWithValue }) => {
    try {
      await orderItemService.deleteOrderItem(itemId);
      return itemId;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to remove item');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart(state) {
      state.orderId = null;
      state.items = [];
    }
  },
  extraReducers: builder => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        const { orderId, item } = action.payload;
        state.orderId = orderId;
        const idx = state.items.findIndex(it => it.itemId === item.itemId);
        if (idx !== -1) {
          state.items[idx] = item;
        } else {
          state.items.push(item);
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(it => it.itemId !== action.payload);
      });
  }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
