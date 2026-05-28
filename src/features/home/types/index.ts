import type { RoommatePreference } from "@/constants";
import type { Smoking } from "@/types";

export type { Smoking };

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
