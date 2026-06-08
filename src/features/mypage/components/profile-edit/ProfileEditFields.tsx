import { Controller, useWatch } from "react-hook-form";

import { Button, Chip, Input, SelectField } from "@/components/ui";
import {
  CAMPUS_OPTIONS,
  DORMITORY_OPTIONS,
  GENDER_OPTIONS,
  GRADE_OPTIONS,
  PROFILE_PLACEHOLDER,
  SELECT_TRIGGER_CLASS_NAME,
} from "@/features/mypage/constants";
import { MY_PROFILE_SEMESTER_OPTIONS } from "@/features/mypage/mocks";
import type { ProfileEditFieldsProps } from "@/features/mypage/types";
import { mapMyProfileCampusToRequest } from "@/features/mypage/utils";
import { useDepartments } from "@/features/onboarding/hooks";
import { cn } from "@/lib/cn";
import { parseDisplayName } from "@/lib/parseDisplayName";

function ProfileEditFields({ control, setValue }: ProfileEditFieldsProps) {
  const selectedCampus = useWatch({ control, name: "campus" });
  const selectedCampusForRequest = mapMyProfileCampusToRequest(selectedCampus);
  const {
    data: departments = [],
    isError: isDepartmentsError,
    isLoading: isDepartmentsLoading,
  } = useDepartments(selectedCampusForRequest);
  const departmentOptions = departments.map((department) => department.name);
  const departmentPlaceholder = isDepartmentsError
    ? "학과를 불러오지 못했어요"
    : PROFILE_PLACEHOLDER.department;

  return (
    <section className="flex flex-col gap-300 rounded-medium bg-bg-secondary px-300 py-500">
      <div className="flex items-center gap-2.5 pb-1.5">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-primary" />
        <h2 className="typo-title1 text-text-strong">기본 정보</h2>
      </div>

      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <ProfileField label="이름">
            <Input
              className="h-11 rounded-small border border-border-normal bg-bg-input px-300 typo-body1"
              disabled
              value={parseDisplayName(field.value)}
            />
          </ProfileField>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <ProfileField label="이메일">
            <Input
              className="h-11 rounded-small border border-border-normal bg-bg-input px-300 typo-body1"
              disabled
              value={field.value}
            />
          </ProfileField>
        )}
      />

      <Controller
        control={control}
        name="birthYear"
        render={({ field, fieldState }) => (
          <ProfileField errorMessage={fieldState.error?.message} label="출생년도">
            <Input
              className="h-11 rounded-small border border-border-normal bg-bg-secondary px-300 typo-body1"
              error={!!fieldState.error}
              inputMode="numeric"
              maxLength={4}
              onBlur={field.onBlur}
              onChange={(event) => {
                field.onChange(event.target.value.replace(/\D/g, ""));
              }}
              value={field.value}
            />
          </ProfileField>
        )}
      />

      <Controller
        control={control}
        name="gender"
        render={({ field, fieldState }) => (
          <ProfileField errorMessage={fieldState.error?.message} label="성별">
            <div aria-label="성별" className="flex w-full gap-200" role="radiogroup">
              {GENDER_OPTIONS.map((option) => {
                const isSelected = field.value === option;

                return (
                  <Button
                    key={option}
                    aria-checked={isSelected}
                    className="min-w-0 flex-1 cursor-pointer"
                    onClick={() => field.onChange(option)}
                    role="radio"
                    type="button"
                    variant={isSelected ? "default" : "neutral"}
                  >
                    {option}
                  </Button>
                );
              })}
            </div>
          </ProfileField>
        )}
      />

      <Controller
        control={control}
        name="campus"
        render={({ field, fieldState }) => (
          <ProfileField errorMessage={fieldState.error?.message} label="캠퍼스">
            <SelectField
              ariaLabel="캠퍼스"
              fieldClassName="gap-0"
              onChange={(value) => {
                field.onChange(value);
                setValue("department", "", { shouldDirty: true, shouldValidate: true });
                setValue("departmentId", null, { shouldDirty: true, shouldValidate: true });
              }}
              options={CAMPUS_OPTIONS}
              placeholder={PROFILE_PLACEHOLDER.campus}
              triggerClassName={SELECT_TRIGGER_CLASS_NAME}
              value={field.value}
            />
          </ProfileField>
        )}
      />

      <div className="flex gap-2.5">
        <Controller
          control={control}
          name="grade"
          render={({ field, fieldState }) => (
            <ProfileField
              className="min-w-0 flex-1"
              errorMessage={fieldState.error?.message}
              label="학년"
            >
              <div
                className={cn(
                  "flex h-11 w-full items-center gap-2.5 rounded-small border border-border-normal bg-bg-secondary px-300 py-200 typo-body1",
                  fieldState.error && "border-border-focus-error",
                )}
              >
                <input
                  aria-label="학년"
                  className="min-w-0 flex-1 bg-transparent text-text-strong outline-none"
                  inputMode="numeric"
                  maxLength={1}
                  onBlur={field.onBlur}
                  onChange={(event) => {
                    const nextValue = event.target.value;

                    if (GRADE_OPTIONS.includes(nextValue as (typeof GRADE_OPTIONS)[number])) {
                      field.onChange(nextValue);
                      return;
                    }

                    field.onChange("");
                  }}
                  value={field.value}
                />
                <span className="shrink-0 text-text-alternative">학년</span>
              </div>
            </ProfileField>
          )}
        />

        <Controller
          control={control}
          name="department"
          render={({ field, fieldState }) => (
            <ProfileField
              className="min-w-0 flex-1"
              errorMessage={fieldState.error?.message}
              label="학과"
            >
              <SelectField
                ariaLabel="학과"
                className="min-w-0 flex-1"
                disabled={!selectedCampus || isDepartmentsLoading}
                fieldClassName="gap-0"
                onChange={(name) => {
                  field.onChange(name);
                  const dept = departments.find((d) => d.name === name);
                  setValue("departmentId", dept?.departmentId ?? null);
                }}
                options={departmentOptions}
                placeholder={departmentPlaceholder}
                triggerClassName={SELECT_TRIGGER_CLASS_NAME}
                value={field.value}
              />
            </ProfileField>
          )}
        />
      </div>

      <Controller
        control={control}
        name="semester"
        render={({ field, fieldState }) => (
          <ProfileField errorMessage={fieldState.error?.message} label="학기">
            <div aria-label="학기" className="flex w-full gap-200" role="radiogroup">
              {MY_PROFILE_SEMESTER_OPTIONS.map((option) => {
                const isSelected = field.value === option;

                return (
                  <Button
                    key={option}
                    aria-checked={isSelected}
                    className="min-w-0 flex-1 cursor-pointer"
                    onClick={() => field.onChange(option)}
                    role="radio"
                    type="button"
                    variant={isSelected ? "default" : "neutral"}
                  >
                    {option}
                  </Button>
                );
              })}
            </div>
          </ProfileField>
        )}
      />

      <Controller
        control={control}
        name="dormitory"
        render={({ field, fieldState }) => (
          <ProfileField errorMessage={fieldState.error?.message} label="기숙사">
            <div className="flex flex-wrap gap-200">
              {DORMITORY_OPTIONS.map((option) => (
                <Chip
                  key={option}
                  className="cursor-pointer"
                  onClick={() => field.onChange(option)}
                  selected={field.value === option}
                >
                  {option}
                </Chip>
              ))}
            </div>
          </ProfileField>
        )}
      />
    </section>
  );
}

function ProfileField({
  children,
  className,
  errorMessage,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  errorMessage?: string;
  label: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="typo-title2 text-text-normal">{label}</label>
      {children}
      {errorMessage ? (
        <span className="px-1.5 typo-caption2 text-state-error">{errorMessage}</span>
      ) : null}
    </div>
  );
}

export { ProfileEditFields };
