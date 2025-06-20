import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BasketProduct } from '../types';

interface BasketState {
  items: BasketProduct[];
}

const initialState: BasketState = {
  items: [],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<BasketProduct>) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromBasket: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearBasket: (state) => {
      state.items = [];
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find(p => p.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const {
  addToBasket,
  removeFromBasket,
  clearBasket,
  updateQuantity,
} = basketSlice.actions;

export default basketSlice.reducer;
