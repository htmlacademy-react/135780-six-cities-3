import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './reducer';
import { createAPI } from '../api/api';

const api = createAPI();

export const store = configureStore({
  reducer: mainReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkExtra = typeof api;
