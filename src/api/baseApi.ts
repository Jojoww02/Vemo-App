import React from "react";

import axios from "axios";
import { ErrorConnection } from "@/components/templates";

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
      return React.createElement(ErrorConnection);
    }
    return Promise.reject(error);
  }
);

export default baseApi;
