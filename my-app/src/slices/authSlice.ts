import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Typ użytkownika
interface User {
  email: string;
  role: 'admin' | 'user';
}

// Typ stanu
interface AuthState {
  user: User | null;
}

// Stan początkowy
const initialState: AuthState = {
  user: null,
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      const email = action.payload;
      const role: 'admin' | 'user' = email === 'admin@admin.pl' ? 'admin' : 'user';
      state.user = { email, role };
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

// Eksport akcji i reduktora
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
