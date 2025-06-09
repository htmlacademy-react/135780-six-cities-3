import { OfferData } from '../components/OfferList/offer-list';

// Тип состояния приложения
export type State = {
  city: string;
  offers: OfferData[];
};

// Начальное состояние
export const initialState: State = {
  city: 'Paris',
  offers: [],
};

// Типы действий
type Action =
  | { type: 'SET_CITY'; payload: string }
  | { type: 'SET_OFFERS'; payload: OfferData[] };

// Редьюсер
export function offersReducer(state: State = initialState, action: Action): State {
  //console.log('REDUCER', action, state);
  switch (action.type) {
    case 'SET_CITY':
      return { ...state, city: action.payload };
    case 'SET_OFFERS':
      return { ...state, offers: action.payload };
    default:
      return state;
  }
}
