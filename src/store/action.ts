import { OfferData } from '../components/OfferList/offer-list';

// Типы констант для экшенов
export const SET_CITY = 'SET_CITY';
export const SET_OFFERS = 'SET_OFFERS';
export const SET_AUTHORIZATION_STATUS = 'SET_AUTHORIZATION_STATUS';
export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';

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
   name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};

export type SetUserAction = {
  type: typeof SET_USER;
  payload: User | null;
};

export type LogoutAction = {
  type: typeof LOGOUT;
};

// Объединённый тип всех экшенов
export type Actions = SetCityAction | SetOffersAction | SetAuthorizationStatusAction | SetUserAction | LogoutAction;


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


export const setUser = (user: User | null): SetUserAction => ({
  type: 'SET_USER',
  payload: user,
});


export const logout = () => ({
  type: 'LOGOUT',
});
