import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  title: string;
  author: string; // ← dodane
  price: number;
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
    addToBasket: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      state.price += action.payload.price;
    },
    clearBasket: (state) => {
      state.products = [];
      state.price = 0;
    },
  },
});

export const { addToBasket, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
