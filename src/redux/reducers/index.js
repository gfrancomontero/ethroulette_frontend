import { combineReducers } from '@reduxjs/toolkit';
import dealerBalanceReducer from '../slices/dealerBalanceSlice';
import metaMaskValidationReducer from '../slices/metaMaskValidationSlice';
import metaMaskUserBalanceReducer from '../slices/metaMaskUserBalanceSlice'; // Import the new reducer

// Combine all reducers
const rootReducer = combineReducers({
  dealerBalance: dealerBalanceReducer,
  metaMaskValidation: metaMaskValidationReducer,
  metaMaskUserBalance: metaMaskUserBalanceReducer, // Add it here
});

export default rootReducer;
