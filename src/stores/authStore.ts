import { create } from "zustand";
import { ACCESS_TOKEN_KEY } from "@/constants/auth";

interface AuthState {
  userId: number | null;
  username: string | null;
  isAuthenticated: boolean;
  setAuth: (userId: number, username: string) => void;
  clearAuth: () => void;
}

// 인증 세션 상태 — 로그인/로그아웃 시점에만 변경되므로 Zustand에서 관리
// localStorage는 모듈 로드 시점(렌더링 외부)에 한 번만 읽어 초기 인증 상태를 설정한다
export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  username: null,
  isAuthenticated: !!localStorage.getItem(ACCESS_TOKEN_KEY),
  setAuth: (userId, username) => set({ userId, username, isAuthenticated: true }),
  clearAuth: () => set({ userId: null, username: null, isAuthenticated: false }),
}));
