import { configureStore } from '@reduxjs/toolkit';
import adminProductsReducer from './slices/adminProductsSlice';
import productsReducer from './slices/productsSlice';
import authReducer from './slices/authSlice';
import basketReducer from './slices/basketSlice';
import usersReducer from './slices/usersSlice';

const store = configureStore({
  reducer: {
    adminProducts: adminProductsReducer,
    products: productsReducer,
    auth: authReducer,
    basket: basketReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
