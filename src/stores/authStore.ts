import { create } from "zustand";

import { ACCESS_TOKEN_KEY, USER_ID_KEY, USERNAME_KEY } from "@/constants";

interface AuthState {
  userId: number | null;
  username: string | null;
  isAuthenticated: boolean;
  setAuth: (accessToken: string, userId: number, username: string) => void;
  clearAuth: () => void;
}

function getStoredUserId() {
  const storedUserId = localStorage.getItem(USER_ID_KEY);

  if (storedUserId == null) {
    return null;
  }

  const userId = Number(storedUserId);

  return Number.isFinite(userId) ? userId : null;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: getStoredUserId(),
  username: localStorage.getItem(USERNAME_KEY),
  isAuthenticated: !!localStorage.getItem(ACCESS_TOKEN_KEY),

  setAuth: (accessToken, userId, username) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(USER_ID_KEY, String(userId));
    localStorage.setItem(USERNAME_KEY, username);
    set({ userId, username, isAuthenticated: true });
  },
  clearAuth: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(USERNAME_KEY);
    set({ userId: null, username: null, isAuthenticated: false });
  },
}));
