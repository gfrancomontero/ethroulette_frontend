import { combineReducers } from '@reduxjs/toolkit';
import dealerBalanceReducer from '../slices/dealerBalanceSlice';
import metaMaskValidationReducer from '../slices/metaMaskValidationSlice';
import metaMaskUserBalanceReducer from '../slices/metaMaskUserBalanceSlice'; // Import the new reducer
import userBalanceReducer from '../slices/userBalanceSlice';  // Import the new userBalance slice

// Combine all reducers
const rootReducer = combineReducers({
  dealerBalance: dealerBalanceReducer,
  metaMaskValidation: metaMaskValidationReducer,
  metaMaskUser: metaMaskUserBalanceReducer,
  userBalance: userBalanceReducer,
});

export default rootReducer;
