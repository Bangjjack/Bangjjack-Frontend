export type ProgressState = "active" | "default";
export type Gender = "male" | "female";
export type SemesterType = "semester" | "half";

export type OnBoardingStepId =
  | "basic-info"
  | "school-info"
  | "lifestyle"
  | "preferences"
  | "matching"
  | "complete";

export type LifestyleSingleFieldKey =
  | "sleepTime"
  | "wakeUpTime"
  | "cleaningCycle"
  | "dormStayDuration"
  | "callHabit"
  | "indoorTemperature"
  | "noiseSensitivity"
  | "smoking";

export type LifestyleMultiFieldKey = "sleepingHabit";

export type OnBoardingFormValues = {
  birthYear: string;
  campus: string;
  callHabit: string | null;
  cleaningCycle: string | null;
  department: string;
  dormStayDuration: string | null;
  dormitory: string | null;
  gender: Gender | null;
  grade: string;
  indoorTemperature: string | null;
  itemSharingPreference: string[];
  noiseSensitivity: string | null;
  priorityFactors: string[];
  semesterType: SemesterType | null;
  sleepTime: string | null;
  sleepingHabit: string[];
  smoking: string | null;
  wakeUpTime: string | null;
};

export type OnBoardingPageContentProps = {
  initialValues?: Partial<OnBoardingFormValues>;
  onBack?: () => void;
  onNext?: (values: OnBoardingFormValues) => void;
  progressStates?: readonly ProgressState[];
  userName?: string;
};
