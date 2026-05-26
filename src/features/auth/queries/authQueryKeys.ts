export type AuthRegistrationStatus = {
  isChecklistRegistered: boolean;
  isOnboarded: boolean;
  isRoommatePreferenceRegistered: boolean;
};

export const authQueryKeys = {
  all: ["auth"] as const,
  registrationStatus: () => [...authQueryKeys.all, "registration-status"] as const,
};
