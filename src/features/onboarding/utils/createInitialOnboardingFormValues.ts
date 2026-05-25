import type { OnBoardingFormValues } from "@/features/onboarding/types";

function createInitialOnboardingFormValues(
  initialValues?: Partial<OnBoardingFormValues>,
): OnBoardingFormValues {
  return {
    birthYear: initialValues?.birthYear ?? "",
    campus: initialValues?.campus ?? "",
    callHabit: initialValues?.callHabit ?? null,
    cleaningCycle: initialValues?.cleaningCycle ?? null,
    department: initialValues?.department ?? "",
    departmentId: initialValues?.departmentId ?? null,
    dormStayDuration: initialValues?.dormStayDuration ?? null,
    dormitory: initialValues?.dormitory ?? null,
    gender: initialValues?.gender ?? null,
    grade: initialValues?.grade ?? "",
    indoorTemperature: initialValues?.indoorTemperature ?? null,
    noiseSensitivity: initialValues?.noiseSensitivity ?? null,
    priorityFactors: initialValues?.priorityFactors ?? [],
    semesterType: initialValues?.semesterType ?? null,
    sleepTime: initialValues?.sleepTime ?? null,
    sleepingHabit: initialValues?.sleepingHabit ?? [],
    smoking: initialValues?.smoking ?? null,
    wakeUpTime: initialValues?.wakeUpTime ?? null,
  };
}

export { createInitialOnboardingFormValues };
