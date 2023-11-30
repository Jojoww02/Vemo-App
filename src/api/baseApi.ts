import axios from "axios";
import { refreshTokenFn } from "@/api/services/auth";

const baseApi = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

baseApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshTokenFn();
      return baseApi(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default baseApi;
