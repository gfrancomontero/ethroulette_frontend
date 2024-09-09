// src/redux/slices/metaMaskValidationSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMetaMaskInstalled: false,
  isWalletConnected: false,
};

const metaMaskValidationSlice = createSlice({
  name: 'metaMaskValidation',
  initialState,
  reducers: {
    setMetaMaskInstalled: (state, action) => {
      state.isMetaMaskInstalled = action.payload;
    },
    setWalletConnected: (state, action) => {
      state.isWalletConnected = action.payload;
    },
  },
});

// Export actions
export const { setMetaMaskInstalled, setWalletConnected } = metaMaskValidationSlice.actions;

// Export the reducer
export default metaMaskValidationSlice.reducer;

// Thunk to check MetaMask installation and connection status
export const checkMetaMaskStatus = () => (dispatch) => {
  if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
    // MetaMask is installed
    dispatch(setMetaMaskInstalled(true));

    // Check if the wallet is connected
    window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
      if (accounts.length > 0) {
        // Wallet is connected
        dispatch(setWalletConnected(true));
      } else {
        // Wallet is not connected
        dispatch(setWalletConnected(false));
      }
    }).catch(() => {
      dispatch(setWalletConnected(false));
    });

    // Set up an event listener for account changes (connect/disconnect wallet)
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length > 0) {
        // Wallet is connected
        dispatch(setWalletConnected(true));
      } else {
        // Wallet is disconnected
        dispatch(setWalletConnected(false));
      }
    });
  } else {
    // MetaMask is not installed
    dispatch(setMetaMaskInstalled(false));
  }
};

// Thunk to dynamically check if MetaMask is installed (to detect install/uninstall)
export const monitorMetaMaskInstallation = () => (dispatch, getState) => {
  // Set an interval to periodically check for MetaMask installation
  const checkInterval = setInterval(() => {
    const { isMetaMaskInstalled } = getState().metaMaskValidation;

    if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
      if (!isMetaMaskInstalled) {
        // MetaMask is now installed, update state
        dispatch(setMetaMaskInstalled(true));
      }
    } else {
      if (isMetaMaskInstalled) {
        // MetaMask is no longer installed, update state
        dispatch(setMetaMaskInstalled(false));
        dispatch(setWalletConnected(false));  // Also mark the wallet as disconnected
      }
    }
  }, 1000);  // Check every 1 second

  // Optional: Return the clearInterval function to stop checking when needed
  return () => clearInterval(checkInterval);
};
