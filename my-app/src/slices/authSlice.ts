import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Typ dla stanu autoryzacji
interface AuthState {
  user: string | null;
}

// Stan początkowy
const initialState: AuthState = {
  user: null,
};

// Tworzymy slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

// Eksportujemy akcje i reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
