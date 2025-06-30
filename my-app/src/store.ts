import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import booksReducer from './slices/booksSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    cart: cartReducer,
  },
});

// Zapisuj koszyk do localStorage po każdej zmianie store
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('cartItems', JSON.stringify(state.cart.items));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
