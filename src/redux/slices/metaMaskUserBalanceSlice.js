import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAccountBalance, connectWalletAndLogin, initializeWeb3 } from '../../services/web3';

// Async thunk to connect MetaMask and get account
export const connectMetaMask = createAsyncThunk(
  'metaMaskUser/connectMetaMask',
  async (_, thunkAPI) => {
    try {
      const initialized = initializeWeb3();
      if (!initialized) {
        throw new Error('MetaMask is not installed');
      }
      const account = await connectWalletAndLogin();
      return account; // Return the connected account
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch MetaMask balance
export const fetchMetaMaskBalance = createAsyncThunk(
  'metaMaskUser/fetchBalance',
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
  name: 'metaMaskUser',
  initialState: {
    account: null,
    balance: 0,
    loading: false,
    error: null,
  },
  reducers: {
    resetBalance: (state) => {
      state.balance = 0;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectMetaMask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(connectMetaMask.fulfilled, (state, action) => {
        state.loading = false;
        state.account = action.payload;
      })
      .addCase(connectMetaMask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to connect MetaMask';
      })
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
