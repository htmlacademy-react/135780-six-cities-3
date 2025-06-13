import { configureStore } from '@reduxjs/toolkit';
import { offersReducer } from './reducer';

export const store = configureStore({
  reducer: offersReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
