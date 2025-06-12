import axios, { AxiosInstance } from 'axios';

// Замените на адрес вашего сервера из ТЗ
const BASE_URL = 'https://15.design.htmlacademy.pro/six-cities';
const TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
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
        // Можно обработать глобально, если нужно
      }
      return Promise.reject(error);
    }
  );

  return api;
};
