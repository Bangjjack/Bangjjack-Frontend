import { z } from "zod";
import type { OnBoardingFormValues } from "@/features/onboarding/types";

const requiredTextSchema = z.string().trim().min(1);
const requiredSelectionSchema = z
  .string()
  .trim()
  .min(1)
  .nullable()
  .refine((value) => value !== null, {
    message: "Required selection",
  });

const onboardingFormSchema = z.object({
  birthYear: requiredTextSchema,
  campus: requiredTextSchema,
  callHabit: requiredSelectionSchema,
  cleaningCycle: requiredSelectionSchema,
  department: requiredTextSchema,
  dormStayDuration: requiredSelectionSchema,
  dormitory: requiredSelectionSchema,
  gender: requiredSelectionSchema,
  grade: requiredTextSchema,
  indoorTemperature: requiredSelectionSchema,
  itemSharingPreference: z.array(requiredTextSchema),
  noiseSensitivity: requiredSelectionSchema,
  priorityFactors: z.array(requiredTextSchema).length(3),
  semesterType: requiredSelectionSchema,
  sleepTime: requiredSelectionSchema,
  sleepingHabit: z.array(requiredTextSchema).min(1),
  smoking: requiredSelectionSchema,
  wakeUpTime: requiredSelectionSchema,
});

const basicInfoStepSchema = onboardingFormSchema.pick({
  birthYear: true,
  gender: true,
  grade: true,
});

const schoolInfoStepSchema = onboardingFormSchema.pick({
  campus: true,
  department: true,
  dormitory: true,
  semesterType: true,
});

const lifestyleStepSchema = onboardingFormSchema.pick({
  callHabit: true,
  cleaningCycle: true,
  dormStayDuration: true,
  indoorTemperature: true,
  noiseSensitivity: true,
  sleepTime: true,
  sleepingHabit: true,
  smoking: true,
  wakeUpTime: true,
});

const priorityStepSchema = onboardingFormSchema.pick({
  priorityFactors: true,
});

function isBasicInfoStepComplete(values: OnBoardingFormValues) {
  return basicInfoStepSchema.safeParse(values).success;
}

function isSchoolInfoStepComplete(values: OnBoardingFormValues) {
  return schoolInfoStepSchema.safeParse(values).success;
}

function isLifestyleStepComplete(values: OnBoardingFormValues) {
  return lifestyleStepSchema.safeParse(values).success;
}

function isPriorityStepComplete(selectedFactors: string[]) {
  return priorityStepSchema.safeParse({ priorityFactors: selectedFactors }).success;
}

export {
  isBasicInfoStepComplete,
  isLifestyleStepComplete,
  isPriorityStepComplete,
  isSchoolInfoStepComplete,
  onboardingFormSchema,
};
