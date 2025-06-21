import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../services/api';
import { UserResponse } from '../types';

interface AuthState {
  user: UserResponse | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Define login thunk
interface LoginCredentials {
  email: string;
  password: string;
}
interface AuthResponse {
  token: string;
  user: UserResponse;
}
export const login = createAsyncThunk<AuthResponse, LoginCredentials>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
      try {
        const response = await api.post<AuthResponse>('/login', credentials);
        // After successful login, set token in axios default header for future requests
        api.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
        return response.data;
      } catch (err: any) {
        // If login fails, throw error message
        const message = err.response?.data?.message || 'Login failed';
        return rejectWithValue(message);
      }
    }
);

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      // Clear user data and token on logout
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      // Also remove the auth header from api
      delete api.defaults.headers.common['Authorization'];
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(login.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.error = null;
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false;
          // The error message is provided in action.payload if we used rejectWithValue
          if (action.payload) {
            state.error = action.payload as string;
          } else {
            state.error = 'Login failed';
          }
        });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
