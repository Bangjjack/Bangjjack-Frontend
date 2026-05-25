import { Controller, type Control, type UseFormSetValue } from "react-hook-form";
import { Button, Chip } from "@/components/ui";
import { OnBoardingSelectField } from "@/features/onboarding/components/fields";
import {
  CAMPUS_OPTIONS,
  DORMITORY_OPTIONS,
  SEMESTER_OPTIONS,
} from "@/features/onboarding/constants";
import type { Department, OnBoardingFormValues } from "@/features/onboarding/types";

type OnBoardingSchoolInfoStepProps = {
  control: Control<OnBoardingFormValues>;
  departments: Department[];
  isDepartmentsError: boolean;
  isDepartmentsLoading: boolean;
  setValue: UseFormSetValue<OnBoardingFormValues>;
  values: OnBoardingFormValues;
};

function OnBoardingSchoolInfoStep({
  control,
  departments,
  isDepartmentsError,
  isDepartmentsLoading,
  setValue,
  values,
}: OnBoardingSchoolInfoStepProps) {
  const departmentOptions = departments.map((department) => department.name);

  const departmentPlaceholder = isDepartmentsError
    ? "학과를 불러오지 못했어요"
    : isDepartmentsLoading
      ? "학과를 불러오는 중이에요"
      : "학과를 선택해주세요";

  return (
    <div className="flex flex-1 flex-col gap-8.75">
      <Controller
        control={control}
        name="campus"
        render={({ field }) => (
          <OnBoardingSelectField
            label="캠퍼스"
            value={field.value}
            onChange={(value) => {
              field.onChange(value);
              setValue("department", "");
              setValue("departmentId", null);
            }}
            options={CAMPUS_OPTIONS}
            placeholder="캠퍼스를 선택해주세요"
          />
        )}
      />

      <Controller
        control={control}
        name="department"
        render={({ field }) => (
          <OnBoardingSelectField
            label="학과"
            value={field.value}
            onChange={(departmentName) => {
              const department = departments.find((item) => item.name === departmentName);

              field.onChange(departmentName);
              setValue("departmentId", department?.departmentId ?? null);
            }}
            options={departmentOptions}
            placeholder={departmentPlaceholder}
          />
        )}
      />

      <div className="flex w-full flex-col gap-300 px-400">
        <h2 className="typo-title1 text-text-strong">학기</h2>
        <div className="flex w-full gap-200">
          {SEMESTER_OPTIONS.map((option) => (
            <Controller
              key={option.value}
              control={control}
              name="semesterType"
              render={({ field }) => (
                <Button
                  type="button"
                  variant={values.semesterType === option.value ? "default" : "neutral"}
                  className="flex-1 cursor-pointer"
                  onClick={() => field.onChange(option.value)}
                >
                  {option.label}
                </Button>
              )}
            />
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col gap-300 px-400">
        <h2 className="typo-title1 text-text-strong">기숙사</h2>
        <div className="flex flex-wrap gap-200">
          {DORMITORY_OPTIONS.map((option) => (
            <Controller
              key={option}
              control={control}
              name="dormitory"
              render={({ field }) => (
                <Chip
                  selected={values.dormitory === option}
                  onClick={() => field.onChange(option)}
                  className="cursor-pointer"
                >
                  {option}
                </Chip>
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export { OnBoardingSchoolInfoStep };
