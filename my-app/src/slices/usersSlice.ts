// src/slices/usersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';

interface UsersState {
  list: User[];
}

const initialState: UsersState = {
  list: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.list.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(user => user.id !== action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.list.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const { addUser, removeUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;
