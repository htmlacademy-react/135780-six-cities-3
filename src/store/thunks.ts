import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, AppThunkExtra } from './index';
import { setAuthorizationStatus, setUser } from './reducer';
import { OfferData } from '../components/OfferList/offer-list';

type UserResponse = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};

type AuthInfo = UserResponse;

export const checkAuth = createAsyncThunk<
  void,
  void,
  { extra: AppThunkExtra; state: RootState }
>(
  'user/checkAuth',
  async (_arg, { extra: api, dispatch }) => {
    try {
      const { data } = await api.get<UserResponse>('/login');
      dispatch(setAuthorizationStatus('AUTH'));
      dispatch(setUser(data));
    } catch (error) {
      dispatch(setAuthorizationStatus('NO_AUTH'));
      dispatch(setUser(null));
    }
  }
);

export const fetchOffers = createAsyncThunk<
  OfferData[],
  void,
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

export const login = createAsyncThunk<
  void,
  { email: string; password: string },
  { extra: AppThunkExtra; state: RootState }
>(
  'user/login',
  async ({ email, password }, { extra: api, dispatch }) => {
    try {
      const { data } = await api.post<AuthInfo>('/login', { email, password });
      localStorage.setItem('six-cities-token', data.token);
      dispatch(setAuthorizationStatus('AUTH'));
      dispatch(setUser(data));
    } catch (error) {
      dispatch(setAuthorizationStatus('NO_AUTH'));
      dispatch(setUser(null));
      throw error;
    }
  }
);
