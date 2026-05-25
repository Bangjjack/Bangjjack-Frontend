export type { LifestyleMultiFieldKey, LifestyleSingleFieldKey } from "@/constants";
import type { Campus } from "@/types";

export type ProgressState = "active" | "default";
export type Gender = "male" | "female";
export type SemesterType = "semester" | "half";

export type Department = {
  campus: Campus;
  departmentId: number;
  name: string;
};

export type GetDepartmentsParams = {
  campus: Campus;
};

export type OnBoardingStepId =
  | "basic-info"
  | "school-info"
  | "lifestyle"
  | "preferences"
  | "matching"
  | "complete";

export type OnBoardingFormValues = {
  birthYear: string;
  campus: string;
  callHabit: string | null;
  cleaningCycle: string | null;
  department: string;
  departmentId: number | null;
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
  isSubmitting?: boolean;
  onBack?: () => void;
  onNext?: (values: OnBoardingFormValues) => void;
  progressStates?: readonly ProgressState[];
  userName?: string;
};
