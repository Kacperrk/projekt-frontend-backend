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
    registerUser: (state, action: PayloadAction<Omit<User, 'id' | 'role'>>) => {
      const newUser: User = {
        ...action.payload,
        id: Date.now(),
        role: 'user',
      };
      state.list.push(newUser);
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

export const { registerUser, removeUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;
