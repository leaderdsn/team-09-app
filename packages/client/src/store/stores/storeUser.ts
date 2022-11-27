import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '@/store/interfaces/interfaces';

const initialState: IUser = {
  user: {},
};

export const storeUser = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = { ...action.payload };
    },
    clearUser(state) {
      state.user = {};
    },
  },
});

export const userAction = storeUser.actions;
export const userReduce = storeUser.reducer;
