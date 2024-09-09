// src/redux/reducers/index.js

import { combineReducers } from '@reduxjs/toolkit';
import dealerBalanceReducer from '../slices/dealerBalanceSlice';

// Combine all reducers (you can add more here in the future)
const rootReducer = combineReducers({
  dealerBalance: dealerBalanceReducer
});

export default rootReducer;
