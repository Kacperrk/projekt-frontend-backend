import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  name: string;
  email: string;
}

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
    clearUsers: (state) => {
      state.list = [];
    },
  },
});

export const { addUser, clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
