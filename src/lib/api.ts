import axios from 'axios';

import { useTokenStore } from '@/stores/auth-store';

const tokenStore = useTokenStore.getState();

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (request) => {
    if (
      request.url?.includes('/api/member/auth/refresh') ||
      request.url?.includes('/api/member/login') ||
      request.url?.includes('/api/member/signup')
    )
      return request;
    const tokenStore = useTokenStore.getState();
    const accessToken = tokenStore.accessToken;
    if (accessToken) {
      request.headers['Authorization'] = accessToken;
    } else {
      //
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = tokenStore.refreshToken;

        const response = await axios.post(`/api/member/auth/refresh`, {
          refreshToken,
        });
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        tokenStore.updateToken({
          accessToken,
          refreshToken: newRefreshToken,
        });

        api.defaults.headers.common['Authorization'] = accessToken;

        return api(originalRequest);
      } catch (refreshError) {
        tokenStore.logout();

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
