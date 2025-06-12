import { createAsyncThunk } from '@reduxjs/toolkit';
import { OfferData } from '../components/OfferList/offer-list';
import { RootState, AppThunkExtra } from './index';
import { setAuthorizationStatus } from './action';

type UserResponse = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};

export const checkAuth = createAsyncThunk<
  void,
  void,
  { extra: AppThunkExtra; state: RootState }
>(
  'user/checkAuth',
  async (_arg, { extra: api, dispatch }) => {
    try {
      await api.get<UserResponse>('/login');
      // Если успешно — авторизован
      dispatch(setAuthorizationStatus('AUTH'));
      // Можно сохранить токен, если нужно:
      // localStorage.setItem('six-cities-token', data.token);
    } catch (error) {
      // Если ошибка — не авторизован
      dispatch(setAuthorizationStatus('NO_AUTH'));
    }
  }
);

export const fetchOffers = createAsyncThunk<
  OfferData[], // что возвращает
  void, // аргумент
  { extra: AppThunkExtra; state: RootState }
>(
  'offers/fetchOffers',
  async (_arg, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<OfferData[]>('/offers');
      return data;
    } catch (error) {
      return rejectWithValue('Не удалось загрузить предложения. Попробуйте позже.');
    }
  }
);
