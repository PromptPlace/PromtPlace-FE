import { LOCAL_STORAGE_KEY,SESSION_STORAGE_KEY } from '@/constants/key';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const item = sessionStorage.getItem(SESSION_STORAGE_KEY.accessToken);
    const accessToken = item ? JSON.parse(item) : null;

    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },

  (error) => Promise.reject(error),
);
