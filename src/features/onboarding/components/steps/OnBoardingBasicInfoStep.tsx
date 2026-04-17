import { type ChangeEvent } from "react";
import { Button, Input } from "@/components/ui";
import { BASIC_INFO_FIELDS, GENDER_OPTIONS } from "../../constants";
import type { Gender, OnBoardingFormValues } from "../../types";
import { getBasicInfoErrors } from "../../validation";

type BasicInfoFieldKey = (typeof BASIC_INFO_FIELDS)[number]["key"];

type OnBoardingBasicInfoStepProps = {
  onFieldChange: (key: BasicInfoFieldKey, value: string) => void;
  onGenderChange: (gender: Gender) => void;
  values: OnBoardingFormValues;
};

type InputFieldProps = {
  errorMessage?: string;
  label: string;
  maxLength: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  suffix: string;
  value: string;
};

type GenderOptionProps = {
  active: boolean;
  label: string;
  onClick: () => void;
};

function InputField({
  errorMessage,
  label,
  maxLength,
  onChange,
  placeholder,
  suffix,
  value,
}: InputFieldProps) {
  return (
    <div className="flex w-full flex-col gap-300 px-400">
      <h2 className="typo-title1 text-text-strong">{label}</h2>
      <div className="flex items-start gap-2.5">
        <Input
          type="tel"
          value={value}
          onChange={onChange}
          inputMode="numeric"
          maxLength={maxLength}
          error={Boolean(errorMessage)}
          errorMessage={errorMessage}
          className="border-transparent bg-bg-input"
          placeholder={placeholder}
        />
        <span className="shrink-0 pt-200 typo-body1 text-text-strong">{suffix}</span>
      </div>
    </div>
  );
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
  const errors = getBasicInfoErrors(values);

  return (
    <div className="flex flex-1 flex-col gap-8.75">
      {BASIC_INFO_FIELDS.map((field) => (
        <InputField
          key={field.key}
          errorMessage={errors[field.key]}
          label={field.label}
          value={values[field.key]}
          onChange={(event) => onFieldChange(field.key, event.target.value)}
          placeholder={field.placeholder}
          suffix={field.suffix}
          maxLength={field.maxLength}
        />
      ))}

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
