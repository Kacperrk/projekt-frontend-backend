import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import authReducer from './slices/authSlice';
import ordersReducer from './slices/ordersSlice';
import productsReducer from './slices/productsSlice';
import basketReducer from './slices/basketSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
    orders: ordersReducer,
    products: productsReducer,
    basket: basketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
