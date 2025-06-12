import { OfferData } from '../components/OfferList/offer-list';
import { fetchOffers } from './thunks';

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

// Типы действий
type Action =
  | { type: 'SET_CITY'; payload: string }
  | { type: 'SET_OFFERS'; payload: OfferData[] }
  | { type: 'SET_AUTHORIZATION_STATUS'; payload: 'AUTH' | 'NO_AUTH' | 'UNKNOWN' }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'LOGOUT' };

// Редьюсер
export function offersReducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'SET_CITY':
      return { ...state, city: action.payload };
    case 'SET_OFFERS':
      return { ...state, offers: action.payload };
    case 'SET_AUTHORIZATION_STATUS':
      return { ...state, authorizationStatus: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return {
        ...state,
        authorizationStatus: 'NO_AUTH',
        user: null,
      };
    default:
      return state;
  }
}

// Обработка асинхронных экшенов (fetchOffers)
export function rootReducer(state: State = initialState, action: Action | { type: string; payload?: unknown }): State {
  if (action.type === 'SET_CITY' || action.type === 'SET_OFFERS' || action.type === 'SET_AUTHORIZATION_STATUS' || action.type === 'SET_USER' || action.type === 'LOGOUT') {
    state = offersReducer(state, action as Action);
  }
  switch (action.type) {
    case fetchOffers.pending.type:
      return { ...state, offersLoading: true, offersError: null };
    case fetchOffers.fulfilled.type:
      return { ...state, offersLoading: false, offers: (action as { payload?: unknown }).payload as OfferData[] };
    case fetchOffers.rejected.type:
      return { ...state, offersLoading: false, offersError: (action as { payload?: unknown }).payload as string | null };
    default:
      return state;
  }
}

