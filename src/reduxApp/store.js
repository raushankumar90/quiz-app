import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './features/authentication'; // Import the reducer from the slice

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer, // Use the reducer from the slice
  },
});
