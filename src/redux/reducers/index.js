import { combineReducers } from '@reduxjs/toolkit';
import dealerBalanceReducer from '../slices/dealerBalanceSlice';
import metaMaskValidationReducer from '../slices/metaMaskValidationSlice';
import metaMaskUserBalanceReducer from '../slices/metaMaskUserBalanceSlice'; // Import the new reducer

// Combine all reducers
const rootReducer = combineReducers({
  dealerBalance: dealerBalanceReducer,
  metaMaskValidation: metaMaskValidationReducer,
  metaMaskUser: metaMaskUserBalanceReducer,  // Ensure this key matches the one used in the component's useSelector

});

export default rootReducer;
