import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  approved: boolean;
}

interface AdminProductsState {
  items: Book[];
}

const initialState: AdminProductsState = {
  items: [],
};

const adminProductsSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Omit<Book, 'approved'>>) => {
      state.items.push({ ...action.payload, approved: false });
    },
    approveBook: (state, action: PayloadAction<number>) => {
      const book = state.items.find(b => b.id === action.payload);
      if (book) book.approved = true;
    },
    removeBook: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(b => b.id !== action.payload);
    },
    updateBook: (state, action: PayloadAction<Omit<Book, 'approved'>>) => {
      const index = state.items.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
  },
});

export const { addBook, approveBook, removeBook, updateBook } = adminProductsSlice.actions;
export default adminProductsSlice.reducer;
