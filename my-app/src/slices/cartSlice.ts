import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookResponse, CreateOrderRequest, CreateOrderItemRequest, UpdateOrderItemRequest, OrderResponse, OrderItemResponse } from '../types';
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

// Thunk to add an item to cart (creates order if not exists, then creates or updates order item)
export const addToCart = createAsyncThunk<{ orderId: number, item: CartItem }, BookResponse, { state: RootState }>(
    'cart/addItem',
    async (book, { getState, rejectWithValue }) => {
      const state = getState();
      try {
        let currentOrderId = state.cart.orderId;
        // If no current order, create a new order for the user
        if (!currentOrderId) {
          const userId = state.auth.user?.id;
          if (!userId) {
            throw new Error('User not logged in');
          }
          const newOrderData: CreateOrderRequest = {
            userId: userId,
            street: 'N/A',
            buildingNumber: 'N/A',
            postalCode: 'N/A',
            city: 'N/A',
            country: 'N/A'
          };
          const newOrder: OrderResponse = await orderService.createOrder(newOrderData);
          currentOrderId = newOrder.id;
        }
        // Check if item already in cart
        const existingItem = state.cart.items.find(it => it.bookId === book.id);
        let resultItem: OrderItemResponse;
        if (existingItem) {
          // If book already in cart, update the quantity by 1
          const updatedData: UpdateOrderItemRequest = {
            quantity: existingItem.quantity + 1
          };
          resultItem = await orderItemService.updateOrderItem(existingItem.itemId, updatedData);
        } else {
          // If not in cart, create new order item with quantity 1
          const newItemData: CreateOrderItemRequest = {
            orderId: currentOrderId,
            bookId: book.id,
            quantity: 1
          };
          resultItem = await orderItemService.createOrderItem(newItemData);
        }
        // Prepare CartItem to return
        const cartItem: CartItem = {
          itemId: resultItem.id,
          bookId: book.id,
          title: book.title,
          quantity: resultItem.quantity,
          unitPrice: resultItem.unitPrice
        };
        return { orderId: currentOrderId, item: cartItem };
      } catch (err: any) {
        const message = err.response?.data?.message || err.message || 'Failed to add item';
        return rejectWithValue(message);
      }
    }
);

// Thunk to remove an item from cart
export const removeFromCart = createAsyncThunk<number, number>(
    'cart/removeItem',
    async (itemId, { rejectWithValue }) => {
      try {
        await orderItemService.deleteOrderItem(itemId);
        return itemId;
      } catch (err: any) {
        const message = err.response?.data?.message || 'Failed to remove item';
        return rejectWithValue(message);
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
  extraReducers: (builder) => {
    builder
        .addCase(addToCart.fulfilled, (state, action) => {
          const { orderId, item } = action.payload;
          // Set orderId if new
          state.orderId = orderId;
          // Check if item already exists in state
          const idx = state.items.findIndex(it => it.itemId === item.itemId);
          if (idx !== -1) {
            // Update existing item
            state.items[idx] = item;
          } else {
            // Add new item
            state.items.push(item);
          }
        })
        .addCase(removeFromCart.fulfilled, (state, action: PayloadAction<number>) => {
          const itemId = action.payload;
          state.items = state.items.filter(it => it.itemId !== itemId);
        });
    // Note: could handle pending/rejected cases if needed for loading or error feedback
  }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
