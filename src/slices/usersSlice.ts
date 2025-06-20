import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserResponse } from '../types';

interface UsersState {
  list: (UserResponse & { password?: string })[];
}

const initialState: UsersState = {
  list: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    registerUser: (
      state,
      action: PayloadAction<Omit<UserResponse, 'id' | 'role'> & { password?: string }>
    ) => {
      const newUser: UserResponse & { password?: string } = {
        ...action.payload,
        id: Date.now(),
        role: 'USER',
      };
      state.list.push(newUser);
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action: PayloadAction<UserResponse>) => {
      const index = state.list.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = {
          ...state.list[index],
          ...action.payload,
        };
      }
    },
  },
});

export const { registerUser, removeUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;
