import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for MetaMask, wallet connection, and user balance
const initialState = {
  isMetaMaskInstalled: false,  // Default to false initially
  account: null,  // Account will be null until a wallet is connected
  balance: 0,     // User's balance on Ethereum Roulette
  error: null,    // To track any errors related to balance fetching
  loading: false,  // Loading state for balance fetching
  metaMaskTransactionIsLoading: false, // Loading state for MetaMask transactions
};

// Create the MetaMask slice
const metaMaskSlice = createSlice({
  name: 'metaMask',
  initialState,
  reducers: {
    setMetaMaskInstalled(state, action) {
      state.isMetaMaskInstalled = action.payload;
    },
    setAccount(state, action) {
      state.account = action.payload;
    },
    clearAccount(state) {
      state.account = null;  // Clear the account if wallet is disconnected
    },
    setBalance(state, action) {
      state.balance = action.payload;  // Update balance in state
    },
    setError(state, action) {
      state.error = action.payload;    // Store error message in state
    },
    setLoading(state, action) {
      state.loading = action.payload;  // Manage the loading state
    },
    setMetaMaskTransactionLoading(state, action) {
      state.metaMaskTransactionIsLoading = action.payload;  // Update transaction loading state
    },
  }
});

// Export the actions generated from the slice
export const { setMetaMaskInstalled, setAccount, clearAccount, setBalance, setError, setLoading, setMetaMaskTransactionLoading } = metaMaskSlice.actions;

// Export the reducer to be used in the store
export default metaMaskSlice.reducer;
