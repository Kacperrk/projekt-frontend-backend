import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Typ dla książki
export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
}

// Stan koszyka
interface BasketState {
  products: Book[];
  total: number;
}

const initialState: BasketState = {
  products: [],
  total: 0,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Book>) => {
      state.products.push(action.payload);
      state.total += action.payload.price;
    },
    removeFromBasket: (state, action: PayloadAction<number>) => {
      const index = state.products.findIndex((book) => book.id === action.payload);
      if (index !== -1) {
        state.total -= state.products[index].price;
        state.products.splice(index, 1);
      }
    },
    clearBasket: (state) => {
      state.products = [];
      state.total = 0;
    },
  },
});

export const { addToBasket, removeFromBasket, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
