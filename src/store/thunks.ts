import { createAsyncThunk } from '@reduxjs/toolkit';
import { OfferData } from '../components/OfferList/offer-list';
import { RootState, AppThunkExtra } from './index';

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
