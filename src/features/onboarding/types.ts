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

export type OnBoardingFormValues = {
  birthYear: string;
  campus: string;
  department: string;
  dormitory: string | null;
  gender: Gender | null;
  grade: string;
  semesterType: SemesterType | null;
};

export type OnBoardingPageContentProps = {
  initialValues?: Partial<OnBoardingFormValues>;
  onBack?: () => void;
  onNext?: (values: OnBoardingFormValues) => void;
  progressStates?: readonly ProgressState[];
  userName?: string;
};
