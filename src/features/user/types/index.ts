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

export type { UserTagsData, UserChecklistData };
