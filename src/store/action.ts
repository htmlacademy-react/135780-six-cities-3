import { OfferData } from '../components/OfferList/offer-list';

// Типы констант для экшенов
export const SET_CITY = 'SET_CITY';
export const SET_OFFERS = 'SET_OFFERS';

// Экшены
export type SetCityAction = {
  type: typeof SET_CITY;
  payload: string;
};

export type SetOffersAction = {
  type: typeof SET_OFFERS;
  payload: OfferData[];
};

// Объединённый тип всех экшенов
export type Actions = SetCityAction | SetOffersAction;

export const setCity = (city: string): SetCityAction => ({
  type: SET_CITY,
  payload: city,
});

export const setOffers = (offers: OfferData[]): SetOffersAction => ({
  type: SET_OFFERS,
  payload: offers,
});
