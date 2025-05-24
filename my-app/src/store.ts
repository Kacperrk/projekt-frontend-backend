import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';
import basketReducer from './slices/basketSlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    basket: basketReducer,
    users: usersReducer,
  },
});

//Eksport typów dla useSelector i useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//Domyślny eksport store
export default store;
