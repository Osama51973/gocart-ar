'use client'; // This line is mandatory for client-side hooks

import { Provider } from 'react-redux';
import { store } from '@/app/store/store'; // **VERIFY THIS PATH IS CORRECT**

// This component provides the Redux store context to its children
export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}