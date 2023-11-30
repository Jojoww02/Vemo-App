import axios from "axios";
import { refreshTokenFn } from "@/api/services/auth";
import { getToken, isTokenSet } from "@/lib/utils/token";

const privateApi = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

privateApi.interceptors.request.use((config) => {
  if (isTokenSet()) {
    config.headers.Authorization = `Bearer ${getToken()}`;
  }
  return config;
});

privateApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshTokenFn();
      return privateApi(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default privateApi;
