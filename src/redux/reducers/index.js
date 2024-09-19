import { combineReducers } from '@reduxjs/toolkit';
import dealerBalanceReducer from '../slices/dealerBalanceSlice';
import metaMaskValidationReducer from '../slices/metaMaskValidationSlice';
import metaMaskUserBalanceReducer from '../slices/metaMaskUserBalanceSlice'; // Import the new reducer
import userBalanceReducer from '../slices/userBalanceSlice';  // Import the new userBalance slice
import betReducer from '../slices/betSlice'; // Import the new bet slice

// Combine all reducers
const rootReducer = combineReducers({
  dealerBalance: dealerBalanceReducer,
  metaMaskValidation: metaMaskValidationReducer,
  metaMaskUser: metaMaskUserBalanceReducer,
  userBalance: userBalanceReducer,
  bet: betReducer,  // Add the bet slice to the root reducer
});

export default rootReducer;
