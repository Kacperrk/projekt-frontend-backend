import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { BookResponse } from '../types';
import { getAllBooks } from '../services/bookService'; // poprawna funkcja z Twojego pliku

interface ProductsState {
  items: BookResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

// Thunk do asynchronicznego pobierania książek
export const fetchProducts = createAsyncThunk<BookResponse[]>(
  'products/fetchProducts',
  async () => {
    const data = await getAllBooks();
    return data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<BookResponse[]>) => {
      state.items = action.payload;
    },
    addProduct: (state, action: PayloadAction<BookResponse>) => {
      state.items.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(product => product.id !== action.payload);
    },
    updateProduct: (state, action: PayloadAction<BookResponse>) => {
      const index = state.items.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Błąd podczas ładowania książek';
      });
  },
});

export const {
  setProducts,
  addProduct,
  removeProduct,
  updateProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
