import { create } from "zustand";

interface AuthState {
  userId: number | null;
  username: string | null;
  isAuthenticated: boolean;
  setAuth: (userId: number, username: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  username: null,
  isAuthenticated: false,
  setAuth: (userId, username) => set({ userId, username, isAuthenticated: true }),
  clearAuth: () => set({ userId: null, username: null, isAuthenticated: false }),
}));
