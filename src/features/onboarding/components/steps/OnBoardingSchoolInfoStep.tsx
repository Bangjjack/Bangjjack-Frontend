import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button, Chip } from "@/components/ui";
import { cn } from "@/lib/cn";
import {
  CAMPUS_OPTIONS,
  DEPARTMENT_OPTIONS,
  DORMITORY_OPTIONS,
  SEMESTER_OPTIONS,
} from "../../constants";
import type { OnBoardingFormValues, SemesterType } from "../../types";

type SchoolInfoFieldKey = "campus" | "department";

type OnBoardingSchoolInfoStepProps = {
  onFieldChange: (key: SchoolInfoFieldKey, value: string) => void;
  onDormitoryChange: (value: string) => void;
  onSemesterTypeChange: (value: SemesterType) => void;
  values: OnBoardingFormValues;
};

type SelectFieldProps = {
  label: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
  value: string;
};

function SelectField({ label, onChange, options, placeholder, value }: SelectFieldProps) {
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
    <div ref={containerRef} className="relative flex w-full flex-col gap-2.75 px-400">
      <h2 className="typo-title1 text-text-strong">{label}</h2>
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
            value ? "flex-1 typo-body1 text-text-strong" : "flex-1 typo-body1 text-text-placeholder"
          }
        >
          {value || placeholder}
        </span>
        <ChevronDown
          className={`size-600 shrink-0 text-icon-normal transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <div className="animate-dropdown-panel absolute left-400 right-400 top-[calc(100%+8px)] z-10 flex flex-col gap-300 overflow-hidden rounded-medium bg-bg-secondary py-100 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08)]">
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
                className={`w-full rounded-medium px-300 py-100 text-left typo-body1 cursor-pointer ${
                  isSelected
                    ? "font-bold text-brand-primary transition-colors hover:bg-brand-primary-light/50"
                    : "font-medium text-text-strong transition-colors hover:bg-neutral-100"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function OnBoardingSchoolInfoStep({
  onFieldChange,
  onDormitoryChange,
  onSemesterTypeChange,
  values,
}: OnBoardingSchoolInfoStepProps) {
  return (
    <div className="flex flex-1 flex-col gap-8.75">
      <SelectField
        label="캠퍼스"
        value={values.campus}
        onChange={(value) => onFieldChange("campus", value)}
        options={CAMPUS_OPTIONS}
        placeholder="캠퍼스를 선택해주세요"
      />

      <SelectField
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
