// redux/slices/userBalanceSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: 0,  // default balance to 0
  metaMaskAddress: ''
};

const userBalanceSlice = createSlice({
  name: 'userBalance',
  initialState,
  reducers: {
    setUserBalance: (state, action) => {
      state.balance = action.payload;
    },
    resetUserBalance: (state) => {
      state.balance = 0;
    }
  }
});

export const { setUserBalance, resetUserBalance } = userBalanceSlice.actions;

export default userBalanceSlice.reducer;
