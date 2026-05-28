import type { RoommatePreference } from "@/constants";

export type Smoking = "NON_SMOKER" | "CIGARETTE" | "ELECTRONIC_CIGARETTE";

export type RecommendedRoommate = {
  userId: number;
  username: string;
  profileImage: string;
  birthYear: number;
  departmentName: string;
  dormitory: string;
  smoking: Smoking;
  roommatePreferences: RoommatePreference[];
  matchRate: number;
};
