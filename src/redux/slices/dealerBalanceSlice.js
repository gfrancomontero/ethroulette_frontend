import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  balance: null,
  totalUserBalances: null,
  effectiveDealerBalance: null,
  isConnected: false,
};

const dealerBalanceSlice = createSlice({
  name: 'dealerBalance',
  initialState,
  reducers: {
    setDealerBalance: (state, action) => {
      state.balance = action.payload;
    },
    setTotalUserBalances: (state, action) => {
      state.totalUserBalances = action.payload;
    },
    setEffectivetotalBalance: (state, action) => {
      state.effectiveDealerBalance = action.payload;
    },
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
    }
  }
});

export const { setDealerBalance, setTotalUserBalances, setEffectivetotalBalance, setConnectionStatus } = dealerBalanceSlice.actions;
export default dealerBalanceSlice.reducer;