import { Button, Chip } from "@/components/ui";
import { GENDER_OPTIONS } from "@/features/onboarding/constants";
import { OnBoardingSelectField } from "@/features/onboarding/components/fields/OnBoardingSelectField";
import type { Gender, OnBoardingFormValues } from "@/features/onboarding/types";

const GRADE_OPTIONS = ["1", "2", "3", "4", "other"] as const;
const BIRTH_YEAR_OPTIONS = createBirthYearOptions();

interface OnBoardingBasicInfoStepProps {
  onFieldChange: (key: "birthYear" | "grade", value: string) => void;
  onGenderChange: (gender: Gender) => void;
  values: OnBoardingFormValues;
}

interface GenderOptionProps {
  active: boolean;
  label: string;
  onClick: () => void;
}

function createBirthYearOptions() {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - 1980 + 1 }, (_, index) => String(currentYear - index));
}

function GenderOption({ active, label, onClick }: GenderOptionProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      variant={active ? "default" : "neutral"}
      className="flex-1 cursor-pointer"
    >
      {label}
    </Button>
  );
}

function OnBoardingBasicInfoStep({
  onFieldChange,
  onGenderChange,
  values,
}: OnBoardingBasicInfoStepProps) {
  return (
    <div className="flex flex-1 flex-col gap-8.75">
      <OnBoardingSelectField
        label="출생연도"
        value={values.birthYear}
        onChange={(value) => onFieldChange("birthYear", value)}
        options={BIRTH_YEAR_OPTIONS}
        placeholder="출생연도를 선택해주세요"
        suffix="년"
      />

      <div className="flex w-full flex-col gap-300 px-400">
        <h2 className="typo-title1 text-text-strong">학년</h2>
        <div className="flex flex-wrap gap-200">
          {GRADE_OPTIONS.map((option) => (
            <Chip
              key={option}
              selected={values.grade === option}
              onClick={() => onFieldChange("grade", option)}
              className="min-w-19 cursor-pointer"
            >
              {option === "other" ? "그 외" : `${option}학년`}
            </Chip>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col gap-300 px-400">
        <h2 className="typo-title1 text-text-strong">성별</h2>
        <div className="flex w-full gap-200">
          {GENDER_OPTIONS.map((option) => (
            <GenderOption
              key={option.value}
              active={values.gender === option.value}
              label={option.label}
              onClick={() => onGenderChange(option.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export { OnBoardingBasicInfoStep };
