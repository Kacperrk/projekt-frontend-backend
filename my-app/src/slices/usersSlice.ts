import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserResponse } from '../types';

interface UsersState {
  list: UserResponse[];
}

const initialState: UsersState = {
  list: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserResponse[]>) => {
      state.list = action.payload;
    },
    addUser: (state, action: PayloadAction<UserResponse>) => {
      state.list.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(user => user.id !== action.payload);
    },
    updateUser: (state, action: PayloadAction<UserResponse>) => {
      const index = state.list.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const { setUsers, addUser, removeUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;
