import {
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import ChevronLeftIcon from "@/assets/icons/ic-chevron-left.svg?react";
import { Button, Input } from "@/components/ui";
import { cn } from "@/lib/cn";

const DEFAULT_PROGRESS_STATES = ["active", "active", "default", "default", "default"] as const;

type ProgressState = "active" | "default";
type Gender = "male" | "female";

type OnBoardingFormValues = {
  birthYear: string;
  gender: Gender | null;
  grade: string;
};

type OnBoardingPageContentProps = {
  initialValues?: Partial<OnBoardingFormValues>;
  onBack?: () => void;
  onNext?: (values: OnBoardingFormValues) => void;
  progressStates?: readonly ProgressState[];
  userName?: string;
};

type InputRowProps = {
  errorMessage?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  label: string;
  maxLength?: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  suffix: string;
  value: string;
};

type GenderOptionProps = {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
};

function ProgressBar({ progressStates }: { progressStates: readonly ProgressState[] }) {
  return (
    <div className="flex w-full items-center justify-center gap-100 px-400">
      {progressStates.map((state, index) => (
        <div
          key={`${state}-${index}`}
          className={cn(
            "h-[3px] min-w-0 flex-1 rounded-full",
            state === "active" ? "bg-brand-primary" : "bg-neutral-250",
          )}
        />
      ))}
    </div>
  );
}

function InputRow({
  errorMessage,
  label,
  value,
  onChange,
  placeholder,
  suffix,
  inputMode = "text",
  maxLength,
}: InputRowProps) {
  return (
    <div className="flex w-full flex-col gap-300 px-400">
      <h2 className="typo-title1 text-text-strong">{label}</h2>
      <div className="flex items-start gap-[10px]">
        <Input
          type={inputMode === "numeric" ? "tel" : "text"}
          value={value}
          onChange={onChange}
          inputMode={inputMode}
          maxLength={maxLength}
          error={Boolean(errorMessage)}
          errorMessage={errorMessage}
          className="bg-bg-input border-transparent"
          placeholder={placeholder}
        />
        <span className="shrink-0 pt-200 typo-body1 text-text-strong">{suffix}</span>
      </div>
    </div>
  );
}

function GenderOption({ active, children, onClick }: GenderOptionProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      variant={active ? "default" : "neutral"}
      className="flex-1 cursor-pointer"
    >
      {children}
    </Button>
  );
}

function OnBoardingPageContent({
  initialValues,
  onBack,
  onNext,
  progressStates = DEFAULT_PROGRESS_STATES,
  userName = "OO",
}: OnBoardingPageContentProps) {
  const [birthYear, setBirthYear] = useState(initialValues?.birthYear ?? "");
  const [grade, setGrade] = useState(initialValues?.grade ?? "");
  const [gender, setGender] = useState<Gender | null>(initialValues?.gender ?? null);

  const birthYearError = birthYear.length > 0 && /\D/.test(birthYear) ? "숫자만 입력해주세요." : "";
  const gradeError = grade.length > 0 && /\D/.test(grade) ? "숫자만 입력해주세요." : "";

  const isComplete = useMemo(() => {
    return (
      birthYear.trim().length > 0 &&
      grade.trim().length > 0 &&
      gender !== null &&
      !birthYearError &&
      !gradeError
    );
  }, [birthYear, birthYearError, grade, gradeError, gender]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isComplete) {
      return;
    }

    onNext?.({
      birthYear,
      grade,
      gender,
    });
  };

  return (
    <div className="min-h-dvh bg-bg-primary">
      <form className="mx-auto flex min-h-dvh w-full max-w-93.75 flex-col" onSubmit={handleSubmit}>
        <div className="h-600 bg-neutral-50" />

        <header className="flex flex-col gap-600">
          <ProgressBar progressStates={progressStates} />

          <div className="flex flex-col gap-400 px-400 py-600">
            <div className="flex items-center gap-400">
              <button
                type="button"
                onClick={onBack}
                className="flex size-600 items-center justify-center cursor-pointer"
                aria-label="이전으로"
              >
                <ChevronLeftIcon className="size-600" />
              </button>
              <div className="h-600 w-700" />
            </div>

            <div className="px-100">
              <h1 className="typo-h3 whitespace-pre-line text-text-strong">
                {`${userName}님에 대해\n알려주세요`}
              </h1>
            </div>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-[35px] pb-800">
          <InputRow
            errorMessage={birthYearError}
            label="출생연도"
            value={birthYear}
            onChange={(event) => setBirthYear(event.target.value)}
            placeholder="연도를 입력해주세요"
            suffix="년"
            inputMode="numeric"
            maxLength={4}
          />

          <InputRow
            errorMessage={gradeError}
            label="학년"
            value={grade}
            onChange={(event) => setGrade(event.target.value)}
            placeholder="해당하는 학년을 입력해주세요"
            suffix="학년"
            inputMode="numeric"
            maxLength={2}
          />

          <div className="flex w-full flex-col gap-300 px-400">
            <h2 className="typo-title1 text-text-strong">성별</h2>
            <div className="flex w-full gap-200">
              <GenderOption active={gender === "male"} onClick={() => setGender("male")}>
                남성
              </GenderOption>
              <GenderOption active={gender === "female"} onClick={() => setGender("female")}>
                여성
              </GenderOption>
            </div>
          </div>
        </main>

        <footer className="px-400 pb-[calc(36px+env(safe-area-inset-bottom))] pt-300">
          <Button type="submit" disabled={!isComplete} className="w-full cursor-pointer">
            다음으로
          </Button>
        </footer>
      </form>
    </div>
  );
}

export { OnBoardingPageContent };
export type { Gender, OnBoardingFormValues, OnBoardingPageContentProps, ProgressState };
