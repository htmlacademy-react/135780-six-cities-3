import { RootState } from './index';
import { OfferData } from '../components/offer-list/offer-list';
import { createSelector } from '@reduxjs/toolkit';


export const selectCity = (state: RootState): string => state.city;
export const selectOffers = (state: RootState): OfferData[] => state.offers;
export const selectOffersByCity = createSelector([selectOffers, selectCity],(offers, city) => offers.filter((offer) => offer.city.name === city));
export const selectOffersLoading = (state: RootState) => state.offersLoading;
export const selectOffersError = (state: RootState) => state.offersError;
export const selectAuthorizationStatus = (state: RootState) => state.authorizationStatus;
export const selectUser = (state: RootState) => state.user;
export const selectCurrentOffer = (state: RootState) => state.currentOffer;
export const selectCurrentOfferLoading = (state: RootState) => state.currentOfferLoading;
export const selectNearOffers = (state: RootState) => state.nearOffers;
export const selectComments = (state: RootState) => state.comments;
export const selectFavorites = (state: RootState) => state.favorites;
export const selectFavoritesLoading = (state: RootState) => state.favoritesLoading;
export const selectFavoritesError = (state: RootState) => state.favoritesError;
