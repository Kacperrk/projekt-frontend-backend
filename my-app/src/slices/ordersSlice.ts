import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BasketProduct, User } from '../types';

interface Order {
  id: number;
  userId: number | undefined;
  userEmail: string;
  items: BasketProduct[];
  total: number;
  date: string;
}

interface OrdersState {
  list: Order[];
}

const initialState: OrdersState = {
  list: [],
};

interface AddOrderPayload {
  user: User;
  items: BasketProduct[];
  total: number;
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<AddOrderPayload>) => {
      const { user, items, total } = action.payload;
      state.list.push({
        id: Date.now(),
        userId: user.id,
        userEmail: user.email,
        items,
        total,
        date: new Date().toLocaleString(),
      });
    },
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
