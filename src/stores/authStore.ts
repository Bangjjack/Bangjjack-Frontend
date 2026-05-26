import { create } from "zustand";

import { ACCESS_TOKEN_KEY, ONBOARDING_COMPLETED_KEY, USER_ID_KEY, USERNAME_KEY } from "@/constants";

interface AuthState {
  userId: number | null;
  username: string | null;
  isAuthenticated: boolean;
  isOnboardingCompleted: boolean;
  setAuth: (authSession: AuthSession) => void;
  setOnboardingCompleted: (isOnboardingCompleted: boolean) => void;
  clearAuth: () => void;
}

type AuthSession = {
  accessToken: string;
  isOnboarded: boolean;
  userId: number;
  username: string;
};

function getStoredUserId() {
  const storedUserId = localStorage.getItem(USER_ID_KEY);

  if (storedUserId == null) {
    return null;
  }

  const userId = Number(storedUserId);

  return Number.isFinite(userId) ? userId : null;
}

function getStoredOnboardingCompleted() {
  return localStorage.getItem(ONBOARDING_COMPLETED_KEY) === "true";
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: getStoredUserId(),
  username: localStorage.getItem(USERNAME_KEY),
  isAuthenticated: !!localStorage.getItem(ACCESS_TOKEN_KEY),
  isOnboardingCompleted: getStoredOnboardingCompleted(),

  setAuth: ({ accessToken, isOnboarded, userId, username }) => {
    const isOnboardingCompleted = isOnboarded;

    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(USER_ID_KEY, String(userId));
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(ONBOARDING_COMPLETED_KEY, String(isOnboardingCompleted));
    set({
      userId,
      username,
      isAuthenticated: true,
      isOnboardingCompleted,
    });
  },
  setOnboardingCompleted: (isOnboardingCompleted) => {
    localStorage.setItem(ONBOARDING_COMPLETED_KEY, String(isOnboardingCompleted));
    set({ isOnboardingCompleted });
  },
  clearAuth: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(ONBOARDING_COMPLETED_KEY);
    set({
      userId: null,
      username: null,
      isAuthenticated: false,
      isOnboardingCompleted: false,
    });
  },
}));
