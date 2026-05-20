import axios from "axios";

import { API_BASE_URL, ACCESS_TOKEN_KEY, MASTER_ACCESS_TOKEN } from "@/constants";
import { useAuthStore } from "@/stores/authStore";

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) ?? MASTER_ACCESS_TOKEN;

  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.config?.url === "/auth/ws-token" && MASTER_ACCESS_TOKEN) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      // TODO: refresh token API 연동 후 토큰 갱신 로직 추가
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      useAuthStore.getState().clearAuth();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
