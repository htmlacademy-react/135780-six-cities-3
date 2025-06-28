import { OfferData } from '../components/OfferList/offer-list';
import { fetchOffers } from './thunks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Тип состояния приложения
export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};

export type State = {
  city: string;
  offers: OfferData[];
  offersLoading: boolean;
  offersError: string | null;
  authorizationStatus: 'AUTH' | 'NO_AUTH' | 'UNKNOWN';
  user: User | null;
};

// Начальное состояние
export const initialState: State = {
  city: 'Paris',
  offers: [],
  offersLoading: false,
  offersError: null,
  authorizationStatus: 'UNKNOWN',
  user: null,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    setAuthorizationStatus(state, action: PayloadAction<'AUTH' | 'NO_AUTH' | 'UNKNOWN'>) {
      state.authorizationStatus = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    logout(state) {
      state.authorizationStatus = 'NO_AUTH';
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.offersLoading = true;
        state.offersError = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offersLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.offersLoading = false;
        state.offersError = action.payload as string;
      });
  },
});

export const { setCity, setAuthorizationStatus, setUser, logout } = mainSlice.actions;
export default mainSlice.reducer;

