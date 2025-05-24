import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../types';

// Rozszerzamy Book o pole quantity
export interface BasketProduct extends Book {
  quantity: number;
}

interface BasketState {
  products: BasketProduct[];
  price: number;
}

const initialState: BasketState = {
  products: [],
  price: 0,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Book>) => {
      const existingProduct = state.products.find(p => p.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.price += action.payload.price;
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const product = state.products.find(p => p.id === action.payload);
      if (!product) return;

      if (product.quantity > 1) {
        product.quantity -= 1;
        state.price -= product.price;
      } else {
        state.products = state.products.filter(p => p.id !== action.payload);
        state.price -= product.price;
      }
    },

    removeFromBasket: (state, action: PayloadAction<number>) => {
      const product = state.products.find(p => p.id === action.payload);
      if (product) {
        state.price -= product.price * product.quantity;
        state.products = state.products.filter(p => p.id !== action.payload);
      }
    },

    clearBasket: (state) => {
      state.products = [];
      state.price = 0;
    },
  },
});

export const {
  addToBasket,
  decreaseQuantity,
  removeFromBasket,
  clearBasket,
} = basketSlice.actions;

export default basketSlice.reducer;
