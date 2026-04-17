export type ProgressState = "active" | "default";
export type Gender = "male" | "female";

export type OnBoardingStepId =
  | "basic-info"
  | "school-info"
  | "lifestyle"
  | "preferences"
  | "matching"
  | "complete";

export type OnBoardingFormValues = {
  birthYear: string;
  gender: Gender | null;
  grade: string;
};

export type OnBoardingPageContentProps = {
  initialValues?: Partial<OnBoardingFormValues>;
  onBack?: () => void;
  onNext?: (values: OnBoardingFormValues) => void;
  progressStates?: readonly ProgressState[];
  userName?: string;
};
