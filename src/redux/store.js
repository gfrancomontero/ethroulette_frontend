// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/index';  // Import the root reducer

// Create the Redux store and register the root reducer
const store = configureStore({
  reducer: rootReducer,
});

export default store;
