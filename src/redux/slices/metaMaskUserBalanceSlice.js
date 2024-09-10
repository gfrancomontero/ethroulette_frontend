// src/redux/slices/metaMaskUserBalanceSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAccountBalance } from '../../services/web3';

// Async thunk to fetch MetaMask balance
export const fetchMetaMaskBalance = createAsyncThunk(
  'metaMaskUserBalance/fetchBalance',
  async (account, thunkAPI) => {
    try {
      const balance = await getAccountBalance(account);
      return balance;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const metaMaskUserBalanceSlice = createSlice({
  name: 'metaMaskUserBalance',
  initialState: {
    balance: 0,
    loading: false,
    error: null,
  },
  reducers: {
    resetBalance: (state) => {
      state.balance = 0;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetaMaskBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMetaMaskBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload;
      })
      .addCase(fetchMetaMaskBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch balance';
      });
  },
});

export const { resetBalance } = metaMaskUserBalanceSlice.actions;
export default metaMaskUserBalanceSlice.reducer;
