export type AuthTokenRequest = {
  code: string;
};

export type AuthTokenResponse = {
  accessToken: string;
  isChecklistRegistered: boolean;
  isOnboarded: boolean;
  isRoommatePreferenceRegistered: boolean;
  userId: number;
  username: string;
};
