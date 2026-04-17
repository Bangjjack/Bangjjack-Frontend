import { DIGITS_ONLY_MESSAGE } from "./constants";
import type { OnBoardingFormValues } from "./types";

function getNumericErrorMessage(value: string) {
  if (!value) return "";
  return /\D/.test(value) ? DIGITS_ONLY_MESSAGE : "";
}

function getBasicInfoErrors(values: OnBoardingFormValues) {
  return {
    birthYear: getNumericErrorMessage(values.birthYear),
    grade: getNumericErrorMessage(values.grade),
  };
}

function isBasicInfoStepComplete(values: OnBoardingFormValues) {
  const errors = getBasicInfoErrors(values);

  return (
    values.birthYear.trim().length > 0 &&
    values.grade.trim().length > 0 &&
    values.gender !== null &&
    !errors.birthYear &&
    !errors.grade
  );
}

function isSchoolInfoStepComplete(values: OnBoardingFormValues) {
  return (
    values.campus.trim().length > 0 &&
    values.department.trim().length > 0 &&
    values.semesterType !== null &&
    values.dormitory !== null
  );
}

function isLifestyleStepComplete(values: OnBoardingFormValues) {
  return (
    values.sleepTime !== null &&
    values.wakeUpTime !== null &&
    values.sleepingHabit.length > 0 &&
    values.cleaningCycle !== null &&
    values.dormStayDuration !== null &&
    values.callHabit !== null &&
    values.indoorTemperature !== null &&
    values.noiseSensitivity !== null &&
    values.smoking !== null
  );
}

function isPriorityStepComplete(selectedFactors: string[]) {
  return selectedFactors.length === 3;
}

export {
  getBasicInfoErrors,
  isBasicInfoStepComplete,
  isLifestyleStepComplete,
  isPriorityStepComplete,
  isSchoolInfoStepComplete,
};
