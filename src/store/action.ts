import { OfferData } from '../components/OfferList/offer-list';

// Типы констант для экшенов
export const SET_CITY = 'SET_CITY';
export const SET_OFFERS = 'SET_OFFERS';
export const SET_AUTHORIZATION_STATUS = 'SET_AUTHORIZATION_STATUS';

// Экшены
export type SetCityAction = {
  type: typeof SET_CITY;
  payload: string;
};

export type SetOffersAction = {
  type: typeof SET_OFFERS;
  payload: OfferData[];
};

export type SetAuthorizationStatusAction = {
  type: typeof SET_AUTHORIZATION_STATUS;
  payload: 'AUTH' | 'NO_AUTH' | 'UNKNOWN';
};

export type User = {
  id: number;
  name: string;
  email: string;
};

// Объединённый тип всех экшенов
export type Actions = SetCityAction | SetOffersAction | SetAuthorizationStatusAction;


export const setCity = (city: string): SetCityAction => ({
  type: SET_CITY,
  payload: city,
});

export const setOffers = (offers: OfferData[]): SetOffersAction => ({
  type: SET_OFFERS,
  payload: offers,
});

export const setAuthorizationStatus = (
  status: 'AUTH' | 'NO_AUTH' | 'UNKNOWN'
): SetAuthorizationStatusAction => ({
  type: SET_AUTHORIZATION_STATUS,
  payload: status,
});


export type SetUserAction = {
  type: 'SET_USER';
  payload: User | null;
};

export const setUser = (user: User | null): SetUserAction => ({
  type: 'SET_USER',
  payload: user,
});
