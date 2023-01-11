import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  main: {},
};

export const storeMain = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setMain(state, action) {
      state.main = { ...action.payload };
    },
    clearMain(state) {
      state.main = {};
    },
    getMain(state) {
      return state.main;
    }
  },
});

export const mainAction = storeMain.actions;
export const mainReduce = storeMain.reducer;
