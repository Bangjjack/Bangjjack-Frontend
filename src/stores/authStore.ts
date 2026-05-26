import { create } from "zustand";

import {
  ACCESS_TOKEN_KEY,
  CHECKLIST_REGISTERED_KEY,
  ONBOARDING_COMPLETED_KEY,
  ROOMMATE_PREFERENCE_REGISTERED_KEY,
  USER_ID_KEY,
  USERNAME_KEY,
} from "@/constants";

interface AuthState {
  userId: number | null;
  username: string | null;
  isAuthenticated: boolean;
  isOnboardingCompleted: boolean;
  isChecklistRegistered: boolean;
  isRoommatePreferenceRegistered: boolean;
  setAuth: (authSession: AuthSession) => void;
  setOnboardingCompleted: (isOnboardingCompleted: boolean) => void;
  clearAuth: () => void;
}

type AuthSession = {
  accessToken: string;
  isChecklistRegistered: boolean;
  isOnboarded: boolean;
  isRoommatePreferenceRegistered: boolean;
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

function getStoredChecklistRegistered() {
  return localStorage.getItem(CHECKLIST_REGISTERED_KEY) === "true";
}

function getStoredRoommatePreferenceRegistered() {
  return localStorage.getItem(ROOMMATE_PREFERENCE_REGISTERED_KEY) === "true";
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: getStoredUserId(),
  username: localStorage.getItem(USERNAME_KEY),
  isAuthenticated: !!localStorage.getItem(ACCESS_TOKEN_KEY),
  isOnboardingCompleted: getStoredOnboardingCompleted(),
  isChecklistRegistered: getStoredChecklistRegistered(),
  isRoommatePreferenceRegistered: getStoredRoommatePreferenceRegistered(),

  setAuth: ({
    accessToken,
    isChecklistRegistered,
    isOnboarded,
    isRoommatePreferenceRegistered,
    userId,
    username,
  }) => {
    const isOnboardingCompleted = isOnboarded;

    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(CHECKLIST_REGISTERED_KEY, String(isChecklistRegistered));
    localStorage.setItem(USER_ID_KEY, String(userId));
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(ONBOARDING_COMPLETED_KEY, String(isOnboardingCompleted));
    localStorage.setItem(
      ROOMMATE_PREFERENCE_REGISTERED_KEY,
      String(isRoommatePreferenceRegistered),
    );
    set({
      userId,
      username,
      isAuthenticated: true,
      isOnboardingCompleted,
      isChecklistRegistered,
      isRoommatePreferenceRegistered,
    });
  },
  setOnboardingCompleted: (isOnboardingCompleted) => {
    localStorage.setItem(ONBOARDING_COMPLETED_KEY, String(isOnboardingCompleted));
    set({ isOnboardingCompleted });
  },
  clearAuth: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(CHECKLIST_REGISTERED_KEY);
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(ONBOARDING_COMPLETED_KEY);
    localStorage.removeItem(ROOMMATE_PREFERENCE_REGISTERED_KEY);
    set({
      userId: null,
      username: null,
      isAuthenticated: false,
      isOnboardingCompleted: false,
      isChecklistRegistered: false,
      isRoommatePreferenceRegistered: false,
    });
  },
}));
