// src/app/ClientProvider.js

'use client';  // Ensure this is client-side

import { Provider } from 'react-redux';  // Import Redux Provider
import { store } from '@/redux/store';   // Import the Redux store

export default function ClientProvider({ children }) {
  return (
    <Provider store={store}>
      {children} {/* Wrap everything inside Redux Provider */}
    </Provider>
  );
}
