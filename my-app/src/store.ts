import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';
import basketReducer from './slices/basketSlice';
import usersReducer from './slices/usersSlice'; // ← dodane

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    basket: basketReducer,
    users: usersReducer, // ← dodane
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
