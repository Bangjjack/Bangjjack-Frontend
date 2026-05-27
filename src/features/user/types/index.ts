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

export type { UserTagsData, UserChecklistData, UserProfileData };
