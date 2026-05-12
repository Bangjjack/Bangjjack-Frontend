import { create } from "zustand";

interface AuthState {
  userId: number | null;
  username: string | null;
  isAuthenticated: boolean;
  setAuth: (userId: number, username: string) => void;
  clearAuth: () => void;
}

// 인증 세션 상태 — 로그인/로그아웃 시점에만 변경되므로 Zustand에서 관리
export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  username: null,
  isAuthenticated: false,
  setAuth: (userId, username) => set({ userId, username, isAuthenticated: true }),
  clearAuth: () => set({ userId: null, username: null, isAuthenticated: false }),
}));
