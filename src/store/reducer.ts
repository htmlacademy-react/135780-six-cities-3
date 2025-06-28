import { OfferData } from '../components/OfferList/offer-list';
import { fetchOffers, fetchOffer, fetchNearOffers, fetchComments, toggleFavoriteOnServer, fetchFavorites } from './thunks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReviewData } from '../types/review';

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
  currentOffer: OfferData | null;
  currentOfferLoading: boolean;
  currentOfferError: string | null;
  nearOffers: OfferData[];
  nearOffersLoading: boolean;
  nearOffersError: string | null;
  comments: ReviewData[];
  commentsLoading: boolean;
  commentsError: string | null;
  favorites: OfferData[];
  favoritesLoading: boolean;
  favoritesError: string | null;
};

// Начальное состояние
export const initialState: State = {
  city: 'Paris',
  offers: [],
  offersLoading: false,
  offersError: null,
  authorizationStatus: 'UNKNOWN',
  user: null,
  currentOffer: null,
  currentOfferLoading: false,
  currentOfferError: null,
  nearOffers: [],
  nearOffersLoading: false,
  nearOffersError: null,
  comments: [],
  commentsLoading: false,
  commentsError: null,
  favorites: [],
  favoritesLoading: false,
  favoritesError: null,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const offer = state.offers.find((o) => o.id === action.payload);
      if (offer) {
        offer.isFavorite = !offer.isFavorite;
      }
      if (state.currentOffer && state.currentOffer.id === action.payload) {
        state.currentOffer.isFavorite = !state.currentOffer.isFavorite;
      }
    },
    resetOffer(state) {
      state.currentOffer = null;
      state.currentOfferError = null;
      state.currentOfferLoading = false;
    },
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
      state.favorites = [];
      state.offers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.favoritesLoading = true;
        state.favoritesError = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favoritesLoading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.favoritesLoading = false;
        state.favoritesError = action.payload as string;
      })
      .addCase(toggleFavoriteOnServer.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.offers.findIndex((o) => o.id === updated.id);
        if (idx !== -1) {
          state.offers[idx] = updated;
        }
        if (state.currentOffer && state.currentOffer.id === updated.id) {
          state.currentOffer = updated;
        }
      })
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
      })
      .addCase(fetchOffer.pending, (state) => {
        state.currentOfferLoading = true;
        state.currentOfferError = null;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.currentOfferLoading = false;
        state.currentOffer = action.payload;
      })
      .addCase(fetchOffer.rejected, (state, action) => {
        state.currentOfferLoading = false;
        state.currentOfferError = action.payload as string;
      })
      .addCase(fetchNearOffers.pending, (state) => {
        state.nearOffersLoading = true;
        state.nearOffersError = null;
      })
      .addCase(fetchNearOffers.fulfilled, (state, action) => {
        state.nearOffersLoading = false;
        state.nearOffers = action.payload;
      })
      .addCase(fetchNearOffers.rejected, (state, action) => {
        state.nearOffersLoading = false;
        state.nearOffersError = action.payload as string;
      })
      .addCase(fetchComments.pending, (state) => {
        state.commentsLoading = true;
        state.commentsError = null;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<ReviewData[]>) => {
        state.commentsLoading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.commentsLoading = false;
        state.commentsError = action.payload as string;
      });
  },
});

export const { toggleFavorite, resetOffer, setCity, setAuthorizationStatus, setUser, logout } = mainSlice.actions;
export default mainSlice.reducer;
