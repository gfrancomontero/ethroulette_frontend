'use client';  // This ensures the component runs on the client-side

import { Provider } from 'react-redux';
import store from '../redux/store';  // Import your Redux store

// This component wraps its children in the Redux Provider
export default function ClientProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
