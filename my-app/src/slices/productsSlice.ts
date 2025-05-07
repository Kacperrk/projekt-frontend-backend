import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../services/api';

interface ProductsState {
  items: Book[];
}

const initialState: ProductsState = {
  items: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Book[]>) => {
      state.items = action.payload;
    },
    addProduct: (state, action: PayloadAction<Book>) => {
      state.items.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(product => product.id !== action.payload);
    },
  },
});

export const { setProducts, addProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;
