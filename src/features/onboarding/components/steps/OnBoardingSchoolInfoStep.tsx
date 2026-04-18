import { Button, Chip } from "@/components/ui";
import { OnBoardingSelectField } from "@/features/onboarding/components/fields";
import {
  CAMPUS_OPTIONS,
  DEPARTMENT_OPTIONS,
  DORMITORY_OPTIONS,
  SEMESTER_OPTIONS,
} from "@/features/onboarding/constants";
import type { OnBoardingFormValues, SemesterType } from "@/features/onboarding/types";

type SchoolInfoFieldKey = "campus" | "department";

type OnBoardingSchoolInfoStepProps = {
  onFieldChange: (key: SchoolInfoFieldKey, value: string) => void;
  onDormitoryChange: (value: string) => void;
  onSemesterTypeChange: (value: SemesterType) => void;
  values: OnBoardingFormValues;
};

function OnBoardingSchoolInfoStep({
  onFieldChange,
  onDormitoryChange,
  onSemesterTypeChange,
  values,
}: OnBoardingSchoolInfoStepProps) {
  return (
    <div className="flex flex-1 flex-col gap-8.75">
      <OnBoardingSelectField
        label="캠퍼스"
        value={values.campus}
        onChange={(value) => onFieldChange("campus", value)}
        options={CAMPUS_OPTIONS}
        placeholder="캠퍼스를 선택해주세요"
      />

      <OnBoardingSelectField
        label="학과"
        value={values.department}
        onChange={(value) => onFieldChange("department", value)}
        options={DEPARTMENT_OPTIONS}
        placeholder="학과를 선택해주세요"
      />

      <div className="flex w-full flex-col gap-300 px-400">
        <h2 className="typo-title1 text-text-strong">학기</h2>
        <div className="flex w-full gap-200">
          {SEMESTER_OPTIONS.map((option) => (
            <Button
              key={option.value}
              type="button"
              variant={values.semesterType === option.value ? "default" : "neutral"}
              className="flex-1 cursor-pointer"
              onClick={() => onSemesterTypeChange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col gap-300 px-400">
        <h2 className="typo-title1 text-text-strong">기숙사</h2>
        <div className="flex flex-wrap gap-200">
          {DORMITORY_OPTIONS.map((option) => (
            <Chip
              key={option}
              selected={values.dormitory === option}
              onClick={() => onDormitoryChange(option)}
              className="cursor-pointer"
            >
              {option}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}

export { OnBoardingSchoolInfoStep };
