import { ErrorConnection } from "@/components/templates";
import axios from "axios";

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
  (error) => {
    // 500
    if (error?.response?.status === 500) {
      return <ErrorConnection />;
    }
    return Promise.reject(error);
  }
);

export default baseApi;
