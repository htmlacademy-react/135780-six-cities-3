import { OfferData } from '../components/OfferList/offer-list';
import { fetchOffers } from './thunks';

// Тип состояния приложения
export type State = {
  city: string;
  offers: OfferData[];
  offersLoading: boolean;
  offersError: string | null;
};

// Начальное состояние
export const initialState: State = {
  city: 'Paris',
  offers: [],
  offersLoading: false,
  offersError: null,
};

// Типы действий
type Action =
  | { type: 'SET_CITY'; payload: string }
  | { type: 'SET_OFFERS'; payload: OfferData[] };

// Редьюсер
export function offersReducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'SET_CITY':
      return { ...state, city: action.payload };
    case 'SET_OFFERS':
      return { ...state, offers: action.payload };
    default:
      return state;
  }
}

// Обработка асинхронных экшенов (fetchOffers)
export function rootReducer(state: State = initialState, action: Action | { type: string; payload?: unknown }): State {
  // Only pass Action-typed actions to offersReducer
  if (action.type === 'SET_CITY' || action.type === 'SET_OFFERS') {
    state = offersReducer(state, action as Action);
  }
  switch (action.type) {
    case fetchOffers.pending.type:
      return { ...state, offersLoading: true, offersError: null };
    case fetchOffers.fulfilled.type:
      return { ...state, offersLoading: false, offers: action.payload as OfferData[] };
    case fetchOffers.rejected.type:
      return { ...state, offersLoading: false, offersError: action.payload as string | null };
    default:
      return state;
  }
}
