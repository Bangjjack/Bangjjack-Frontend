import axios from "axios";

import { API_BASE_URL, ACCESS_TOKEN_KEY } from "@/constants";
import { useAuthStore } from "@/stores/authStore";

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // TODO: refresh token API 연동 후 토큰 갱신 로직 추가
      useAuthStore.getState().clearAuth();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
