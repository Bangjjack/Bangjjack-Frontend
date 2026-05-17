import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Header, Textarea } from "@/components/ui";
import { HABIT_CATEGORIES } from "@/constants";
import { postWriteSchema, type PostWriteFormValues } from "@/features/board/schemas";
import type { BasicTagCategory } from "@/features/board/types";

import {
  BasicTagList,
  CounterInput,
  HabitSelectList,
  WriteCard,
} from "@/features/board/components/shared";

// TODO: API 연동 시 실제 유저 데이터로 교체
const BASIC_TAG_CATEGORIES: BasicTagCategory[] = [
  {
    title: "학기",
    tags: [
      { label: "학기 (16주)", selected: true },
      { label: "반기 (25주)", selected: false },
    ],
  },
  {
    title: "기숙사",
    tags: [
      { label: "1 기숙사", selected: true },
      { label: "2 기숙사", selected: false },
      { label: "3 기숙사", selected: false },
    ],
  },
  {
    title: "이런 점을 중요하게 생각해요",
    tags: [
      { label: "취침 시간", selected: true },
      { label: "기상 시간", selected: true },
      { label: "잠버릇", selected: true },
      { label: "기숙사 체류 시간", selected: false },
      { label: "청결 습관", selected: false },
      { label: "실내 온도", selected: false },
      { label: "소음 민감도", selected: false },
      { label: "물건 공유", selected: false },
      { label: "흡연 여부", selected: false },
      { label: "통화 습관", selected: false },
    ],
  },
];

const ROOM_TYPE_OPTIONS = ["2인 1실", "3인 1실", "4인 1실"] as const;

const TITLE_MAX_LENGTH = 40;
const INTRO_MAX_LENGTH = 500;

const EMPTY_DEFAULT_VALUES: PostWriteFormValues = {
  title: "",
  memberCount: 1,
  roomType: "",
  intro: "",
  habits: {},
};

interface PostFormShellProps {
  headerTitle: string;
  defaultValues?: PostWriteFormValues;
  submitLabel: string;
  onSubmit: (data: PostWriteFormValues) => void;
  onBackClick: () => void;
}

function PostFormShell({
  headerTitle,
  defaultValues,
  submitLabel,
  onSubmit,
  onBackClick,
}: PostFormShellProps) {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { isValid, errors },
  } = useForm<PostWriteFormValues>({
    resolver: zodResolver(postWriteSchema),
    mode: "onTouched",
    defaultValues: defaultValues ?? EMPTY_DEFAULT_VALUES,
  });

  const title = watch("title");
  const memberCount = watch("memberCount");
  const roomType = watch("roomType");
  const intro = watch("intro");
  const habits = watch("habits");

  function handleHabitSelect(label: string, option: string) {
    const current = getValues("habits") ?? {};
    const isDeselect = current[label] === option;

    if (isDeselect) {
      const next = { ...current };
      delete next[label];
      setValue("habits", next, { shouldValidate: true });
    } else {
      setValue("habits", { ...current, [label]: option }, { shouldValidate: true });
    }
  }

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-bg-primary">
      <Header showBack title={headerTitle} onBackClick={onBackClick} />

      <main className="scrollbar-none min-h-0 flex-1 overflow-y-auto pb-[100px] pt-400">
        <form
          id="post-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-300 px-400"
        >
          {/* Card 1 - 제목 */}
          <WriteCard className="gap-200">
            <h2 className="typo-title1 text-text-strong">제목</h2>
            <Controller
              control={control}
              name="title"
              render={({ field, fieldState }) => (
                <Textarea
                  placeholder="예) 글캠 기숙사 2인실 룸메 구해요"
                  maxLength={TITLE_MAX_LENGTH}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  onClear={() => field.onChange("")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault();
                  }}
                  error={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  autoGrow
                  rows={1}
                  className="typo-caption1"
                />
              )}
            />
            <span className="typo-caption2 text-right text-text-caption">
              {title.length}/{TITLE_MAX_LENGTH}
            </span>
          </WriteCard>

          {/* Card 2 - 모집 인원 + 인실 */}
          <WriteCard className="gap-500">
            {/* 모집 인원 */}
            <div className="flex items-center justify-between">
              <h2 className="typo-title1 text-text-strong">모집 인원</h2>
              <CounterInput
                value={memberCount}
                onDecrement={() =>
                  setValue("memberCount", Math.max(1, memberCount - 1), {
                    shouldValidate: true,
                  })
                }
                onIncrement={() =>
                  setValue("memberCount", Math.min(4, memberCount + 1), {
                    shouldValidate: true,
                  })
                }
              />
            </div>

            {/* 인실 */}
            <div className="flex flex-col gap-300">
              <h2 className="typo-title1 text-text-strong">인실</h2>
              <div className="flex gap-200">
                {ROOM_TYPE_OPTIONS.map((option) => (
                  <Button
                    key={option}
                    type="button"
                    size="sm"
                    variant={roomType === option ? "default" : "neutral"}
                    onClick={() =>
                      setValue("roomType", roomType === option ? "" : option, {
                        shouldValidate: true,
                      })
                    }
                    className="flex-1"
                  >
                    {option}
                  </Button>
                ))}
              </div>
              {errors.roomType?.message && (
                <span className="typo-caption2 text-state-error">{errors.roomType.message}</span>
              )}
            </div>
          </WriteCard>

          {/* Card 3 - 소개글 */}
          <WriteCard className="gap-200">
            <h2 className="typo-title1 text-text-strong">소개글</h2>
            <Controller
              control={control}
              name="intro"
              render={({ field, fieldState }) => (
                <Textarea
                  placeholder="자기소개, 원하는 룸메이트 조건을 자유롭게 적어봐요"
                  maxLength={INTRO_MAX_LENGTH}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  onClear={() => field.onChange("")}
                  error={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  autoGrow
                  rows={6}
                  className="typo-caption1"
                />
              )}
            />
            <span className="typo-caption2 text-right text-text-caption">
              {intro?.length ?? 0}/{INTRO_MAX_LENGTH}
            </span>
          </WriteCard>

          {/* Card 4 - 기본 태그 */}
          <WriteCard className="gap-400">
            <div className="flex flex-col gap-100">
              <div className="flex items-center gap-100">
                <h2 className="typo-title1 text-text-strong">기본 태그</h2>
              </div>
              <span className="typo-caption2 text-text-caption">해당 정보는 수정할 수 없어요</span>
            </div>

            <BasicTagList categories={BASIC_TAG_CATEGORIES} />
          </WriteCard>

          {/* Card 5 - 공동 생활습관 */}
          <WriteCard className="gap-400">
            <div className="flex flex-col gap-100">
              <h2 className="typo-title1 text-text-strong">공동 생활습관</h2>
              <span className="typo-caption2 text-text-caption">해당하는 태그를 선택해주세요</span>
            </div>

            <HabitSelectList
              categories={HABIT_CATEGORIES}
              selected={habits ?? {}}
              onSelect={handleHabitSelect}
            />
            {errors.habits?.message != null && (
              <span className="typo-caption2 text-state-error">
                {String(errors.habits.message)}
              </span>
            )}
          </WriteCard>
        </form>
      </main>

      {/* 하단 고정 버튼 */}
      <div className="absolute inset-x-0 bottom-0 z-40 bg-bg-primary px-400 pb-9 pt-300">
        <Button type="submit" form="post-form" disabled={!isValid} className="w-full">
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}

export { PostFormShell };
export type { PostFormShellProps };
