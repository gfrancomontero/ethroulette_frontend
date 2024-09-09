// src/redux/slices/dealerBalanceSlice.js

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  balance: null,
  isConnected: false,
};

const dealerBalanceSlice = createSlice({
  name: 'dealerBalance',
  initialState,
  reducers: {
    setDealerBalance: (state, action) => {
      state.balance = action.payload;
    },
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
    }
  }
})

export const { setDealerBalance, setConnectionStatus } = dealerBalanceSlice.actions;
export default dealerBalanceSlice.reducer;