import { RootState } from './index';
import { OfferData } from '../components/OfferList/offer-list';

export const selectCity = (state: RootState): string => state.city;

export const selectOffers = (state: RootState): OfferData[] => state.offers;

// Селектор для предложений только по выбранному городу
export const selectOffersByCity = (state: RootState): OfferData[] =>
  state.offers.filter((offer) => offer.city === state.city);
