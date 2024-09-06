// src/redux/reducers/index.js

import { combineReducers } from '@reduxjs/toolkit';
import metaMaskReducer from '../slices/metaMaskSlice';  // Import the MetaMask reducer

// Combine all reducers (you can add more here in the future)
const rootReducer = combineReducers({
  metaMask: metaMaskReducer,  // Combine the MetaMask slice
});

export default rootReducer;
