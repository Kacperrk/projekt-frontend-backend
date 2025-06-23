import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BookResponse} from '../types';
import * as bookService from '../services/bookService';

interface BooksState {
  items: BookResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchBooks = createAsyncThunk<BookResponse[]>(
    'books/fetchAll',
    async (_, { rejectWithValue }) => {
      try {
          return await bookService.getAllBooks();
      } catch (err: any) {
        const message = err.response?.data?.message || 'Failed to fetch books';
        return rejectWithValue(message);
      }
    }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchBooks.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<BookResponse[]>) => {
          state.loading = false;
          state.items = action.payload;
          state.error = null;
        })
        .addCase(fetchBooks.rejected, (state, action) => {
          state.loading = false;
          if (action.payload) {
            state.error = action.payload as string;
          } else {
            state.error = 'Failed to fetch books';
          }
        });
  }
});

export default booksSlice.reducer;
