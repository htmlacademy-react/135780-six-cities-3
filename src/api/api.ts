import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://16.design.htmlacademy.pro/six-cities';
const TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('six-cities-token');
    if (token) {
      config.headers = config.headers ?? {};
      config.headers['X-Token'] = token;
    }
    return config;
  });

  // Пример перехватчика для 401
  api.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        (error as { response?: { status?: number } }).response?.status === 401
      ) {
        // Можно обработать глобально
      }
      return Promise.reject(error);
    }
  );

  return api;
};
