// src/redux/reducers/index.js

import { combineReducers } from '@reduxjs/toolkit';
import dealerBalanceReducer from '../slices/dealerBalanceSlice';
import metaMaskValidationReducer from '../slices/metaMaskValidationSlice';  // Import the new slice

// Combine all reducers (you can add more here in the future)
const rootReducer = combineReducers({
  dealerBalance: dealerBalanceReducer,
  metaMaskValidation: metaMaskValidationReducer,  // Add the new reducer
});

export default rootReducer;
