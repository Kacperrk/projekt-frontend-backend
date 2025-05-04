import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
}

interface BasketState {
  products: Product[];
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
    addToBasket: (state, action: PayloadAction<Omit<Product, 'quantity'>>) => {
      const existing = state.products.find(p => p.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.price += action.payload.price;
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const product = state.products.find(p => p.id === action.payload);
      if (product) {
        product.quantity -= 1;
        state.price -= product.price;

        if (product.quantity <= 0) {
          state.products = state.products.filter(p => p.id !== action.payload);
        }
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

export const { addToBasket, decreaseQuantity, removeFromBasket, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
