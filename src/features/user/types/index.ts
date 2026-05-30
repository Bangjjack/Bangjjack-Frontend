import type { Semester, Dormitory } from "@/types";
import type { RoommatePreference } from "@/constants";

type UserTagsData = {
  semester: string;
  dormitory: string;
  roommatePreferences: string[];
};

type UserChecklistData = {
  bedtime: string;
  wakeUpTime: string;
  sleepHabits: string[];
  cleaningCycle: string;
  dormStayTime: string;
  callHabit: string;
  indoorTemperature: string;
  noiseSensitivity: string;
  smoking: string;
};

type UserProfileData = {
  username: string;
  email: string;
  profileImage?: string | null;
  birthYear: number;
  gender: string;
  campus: string;
  departmentId: number;
  departmentName: string;
  grade: number;
  semester: string;
  dormitory: string;
  checklist: UserChecklistData | null;
  roommatePreferences: string[];
};

type UserLifestyleChecklist = {
  bedtime: { value: string; matched: boolean };
  wakeUpTime: { value: string; matched: boolean };
  sleepHabits: { value: string[]; matched: boolean };
  cleaningCycle: { value: string; matched: boolean };
  dormStayTime: { value: string; matched: boolean };
  callHabit: { value: string; matched: boolean };
  indoorTemperature: { value: string; matched: boolean };
  noiseSensitivity: { value: string; matched: boolean };
  smoking: { value: string; matched: boolean };
};

type UserProfile = {
  userId: number;
  profileImage: string;
  username: string;
  grade: number;
  birthYear: number;
  departmentName: string;
  semester: Semester;
  dormitory: Dormitory;
  roommatePreferences: RoommatePreference[];
  lifestyleChecklist: UserLifestyleChecklist;
};

type UpdateUserProfileRequest = {
  birthYear: number;
  campus: string;
  departmentId: number;
  dormitory: string;
  gender: string;
  grade: number;
  preferences: string[];
  semester: string;
};

export type {
  UserTagsData,
  UserChecklistData,
  UserProfileData,
  UserLifestyleChecklist,
  UserProfile,
  UpdateUserProfileRequest,
};
