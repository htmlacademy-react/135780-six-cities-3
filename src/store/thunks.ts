import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, AppThunkExtra } from './index';
import { setAuthorizationStatus, setUser, logout } from './reducer';
import { OfferData } from '../components/offerlist/offer-list';
import { ReviewData } from '../types/review';

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

export const fetchOffer = createAsyncThunk<
  OfferData,
  string,
  { extra: AppThunkExtra; state: RootState }
>(
  'offer/fetchOffer',
  async (id, { extra, rejectWithValue }) => {
    const api = extra;
    try {
      const { data } = await api.get<OfferData>(`/offers/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue('Не удалось загрузить предложение');
    }
  }
);

export const logoutAndReset = createAsyncThunk<
  void,
  void,
  { extra: AppThunkExtra; state: RootState }
>(
  'user/logoutAndReset',
  async (_, { dispatch }) => {
    localStorage.removeItem('six-cities-token');
    dispatch(logout());
    await dispatch(fetchOffers()); // обязательно await!
  }
);

// Получение предложений неподалёку
export const fetchNearOffers = createAsyncThunk<
  OfferData[],
  string,
  { extra: AppThunkExtra; state: RootState }
>(
  'offer/fetchNearOffers',
  async (id, { extra, rejectWithValue }) => {
    const api = extra;
    try {
      const { data } = await api.get<OfferData[]>(`/offers/${id}/nearby`);
      return data;
    } catch (error) {
      return rejectWithValue('Не удалось загрузить предложения рядом');
    }
  }
);

// Получение комментариев
export const fetchComments = createAsyncThunk<
  ReviewData[],
  string,
  { extra: AppThunkExtra; state: RootState }
>(
  'offer/fetchComments',
  async (id, { extra, rejectWithValue }) => {
    const api = extra;
    try {
      const { data } = await api.get<ReviewData[]>(`/comments/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue('Не удалось загрузить комментарии');
    }
  }
);

type NewComment = {
  comment: string;
  rating: number;
};

export const postComment = createAsyncThunk<
  void,
  { offerId: string; data: NewComment },
  { state: RootState; extra: AppThunkExtra }
>(
  'comments/postComment',
  async ({ offerId, data }, { dispatch, rejectWithValue, extra: api }) => {
    try {
      await api.post(
        `/comments/${offerId}`,
        data
      );
      dispatch(fetchComments(offerId));
    } catch (error: unknown) {
      return rejectWithValue(
        typeof error === 'object' && error !== null && 'response' in error
          ? (error as { response: { data?: { message?: string } } }).response.data?.message || 'Ошибка отправки комментария'
          : 'Ошибка отправки комментария'
      );
    }
  }
);

export const fetchFavorites = createAsyncThunk<
  OfferData[],
  void,
  { extra: AppThunkExtra; state: RootState }
>(
  'offers/fetchFavorites',
  async (_arg, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<OfferData[]>('/favorite');
      return data;
    } catch (error) {
      return rejectWithValue('Не удалось загрузить избранное');
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
      dispatch(fetchOffers());
      dispatch(fetchFavorites());
    } catch (error) {
      dispatch(setAuthorizationStatus('NO_AUTH'));
      dispatch(setUser(null));
      throw error;
    }
  }
);

export const toggleFavoriteOnServer = createAsyncThunk<
  string,
  { offerId: string; status: 0 | 1 },
  { extra: AppThunkExtra; state: RootState }
>(
  'offers/toggleFavoriteOnServer',
  async ({ offerId, status }, { extra: api }) => {
    await api.post(`/favorite/${offerId}/${status}`);
    return offerId;
  }
);
