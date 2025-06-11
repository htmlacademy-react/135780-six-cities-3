import { RootState } from './index';
import { OfferData } from '../components/OfferList/offer-list';

export const selectCity = (state: RootState): string => state.city;
export const selectOffers = (state: RootState): OfferData[] => state.offers;
export const selectOffersByCity = (state: RootState) =>
  state.offers.filter((offer) => offer.city.name === state.city);
export const selectOffersLoading = (state: RootState) => state.offersLoading;
export const selectOffersError = (state: RootState) => state.offersError;
