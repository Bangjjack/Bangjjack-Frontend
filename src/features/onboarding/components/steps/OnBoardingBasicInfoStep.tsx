import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button, Chip } from "@/components/ui";
import { cn } from "@/lib/cn";
import { GENDER_OPTIONS } from "../../constants";
import type { Gender, OnBoardingFormValues } from "../../types";

const GRADE_OPTIONS = ["1", "2", "3", "4", "other"] as const;

type OnBoardingBasicInfoStepProps = {
  onFieldChange: (key: "birthYear" | "grade", value: string) => void;
  onGenderChange: (gender: Gender) => void;
  values: OnBoardingFormValues;
};

type SelectFieldProps = {
  label: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
  suffix?: string;
  value: string;
};

type GenderOptionProps = {
  active: boolean;
  label: string;
  onClick: () => void;
};

function SelectField({ label, onChange, options, placeholder, suffix, value }: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (!open) return;

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className="flex w-full flex-col gap-2.75 px-400">
      <h2 className="typo-title1 text-text-strong">{label}</h2>
      <div className="flex items-start gap-2.5">
        <div className="relative flex-1">
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-small border-[1.5px] bg-bg-secondary px-300 py-200 text-left outline-none transition-colors cursor-pointer",
              open ? "border-border-focus-primary" : "border-border-normal",
              "focus-visible:border-border-focus-primary",
            )}
          >
            <span
              className={
                value
                  ? "flex-1 typo-body1 text-text-strong"
                  : "flex-1 typo-body1 text-text-placeholder"
              }
            >
              {value || placeholder}
            </span>
            <ChevronDown
              className={cn(
                "size-600 shrink-0 text-icon-normal transition-transform",
                open && "rotate-180",
              )}
            />
          </button>

          {open ? (
            <div className="animate-dropdown-panel absolute left-0 right-0 top-[calc(100%+8px)] z-10 flex max-h-72 flex-col gap-300 overflow-y-auto rounded-medium bg-bg-secondary py-100 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08)]">
              {options.map((option) => {
                const isSelected = value === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      onChange(option);
                      setOpen(false);
                    }}
                    className={cn(
                      "w-full rounded-medium px-300 py-100 text-left typo-body1 cursor-pointer transition-colors",
                      isSelected
                        ? "font-bold text-brand-primary hover:bg-brand-primary-light/50"
                        : "font-medium text-text-strong hover:bg-neutral-100",
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
        {suffix ? (
          <span className="shrink-0 pt-200 typo-body1 text-text-strong">{suffix}</span>
        ) : null}
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
  const birthYearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 1980 + 1 }, (_, index) =>
      String(currentYear - index),
    );
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-8.75">
      <SelectField
        label="출생연도"
        value={values.birthYear}
        onChange={(value) => onFieldChange("birthYear", value)}
        options={birthYearOptions}
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
