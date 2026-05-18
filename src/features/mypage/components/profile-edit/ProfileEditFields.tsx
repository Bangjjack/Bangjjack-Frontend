import { Controller } from "react-hook-form";

import { Input, SelectField } from "@/components/ui";
import {
  AGE_OPTIONS,
  DEPARTMENT_OPTIONS,
  PROFILE_PLACEHOLDER,
  SELECT_TRIGGER_CLASS_NAME,
} from "@/features/mypage/constants";
import type { ProfileEditFieldsProps } from "@/features/mypage/types";

function ProfileEditFields({ control }: ProfileEditFieldsProps) {
  return (
    <section className="flex flex-col gap-300 px-100 pt-300">
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <Input
            aria-label="이름"
            className="h-11 rounded-medium bg-bg-secondary px-300 typo-body1"
            error={!!fieldState.error}
            errorMessage={fieldState.error?.message}
            onBlur={field.onBlur}
            onChange={field.onChange}
            onClear={() => field.onChange("")}
            placeholder={PROFILE_PLACEHOLDER.name}
            value={field.value}
          />
        )}
      />

      <div className="flex items-center justify-center gap-2.5 self-stretch">
        <div className="flex flex-[1_0_0] items-start justify-center gap-100">
          <Controller
            control={control}
            name="age"
            render={({ field, fieldState }) => (
              <div className="flex min-w-0 flex-1 flex-col">
                <SelectField
                  ariaLabel="나이"
                  className="min-w-0 flex-1"
                  fieldClassName="gap-0"
                  onChange={field.onChange}
                  options={AGE_OPTIONS}
                  placeholder={PROFILE_PLACEHOLDER.age}
                  triggerClassName={SELECT_TRIGGER_CLASS_NAME}
                  value={field.value}
                />
                {fieldState.error?.message ? (
                  <span className="mt-100 px-1.5 typo-caption2 text-state-error">
                    {fieldState.error.message}
                  </span>
                ) : null}
              </div>
            )}
          />

          <span className="shrink-0 pt-200 typo-body1 text-text-normal">세</span>
        </div>

        <span
          aria-hidden="true"
          className="mt-200 h-3.75 w-[0.09375rem] shrink-0 bg-border-strong"
        />

        <Controller
          control={control}
          name="department"
          render={({ field, fieldState }) => (
            <div className="flex min-w-0 flex-1 flex-col">
              <SelectField
                ariaLabel="학과"
                className="min-w-0 flex-1"
                fieldClassName="gap-0"
                onChange={field.onChange}
                options={DEPARTMENT_OPTIONS}
                placeholder={PROFILE_PLACEHOLDER.department}
                triggerClassName={SELECT_TRIGGER_CLASS_NAME}
                value={field.value}
              />
              {fieldState.error?.message ? (
                <span className="mt-100 px-1.5 typo-caption2 text-state-error">
                  {fieldState.error.message}
                </span>
              ) : null}
            </div>
          )}
        />
      </div>
    </section>
  );
}

export { ProfileEditFields };
