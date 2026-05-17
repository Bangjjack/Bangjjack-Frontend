import { useState } from "react";
import { useNavigate } from "react-router";

import { Button, ChipQuestionSection, Header } from "@/components/ui";
import { toast } from "@/components/ui";
import { LIFESTYLE_MULTI_QUESTIONS, LIFESTYLE_SINGLE_QUESTIONS } from "@/constants";
import type { LifestyleMultiFieldKey, LifestyleSingleFieldKey } from "@/constants";
import { useGoBack } from "@/hooks";
import { usePostWriteDraftStore } from "@/features/board/stores/postWriteDraftStore";

type ChecklistState = Record<string, string | string[]>;

function getInitialState(): ChecklistState {
  const state: ChecklistState = {};

  for (const q of LIFESTYLE_SINGLE_QUESTIONS) {
    state[q.key] = "";
  }
  for (const q of LIFESTYLE_MULTI_QUESTIONS) {
    state[q.key] = [];
  }

  return state;
}

function isAllAnswered(state: ChecklistState): boolean {
  for (const q of LIFESTYLE_SINGLE_QUESTIONS) {
    if (!state[q.key]) return false;
  }
  for (const q of LIFESTYLE_MULTI_QUESTIONS) {
    const val = state[q.key];
    if (!Array.isArray(val) || val.length === 0) return false;
  }
  return true;
}

function PostChecklistContent() {
  const navigate = useNavigate();
  const handleBackClick = useGoBack("/board/write");
  const { draft, clearDraft } = usePostWriteDraftStore();

  // TODO: 실제 API 연동 시 온보딩에서 저장한 사용자 데이터를 초기값으로 로드
  const [answers, setAnswers] = useState<ChecklistState>(getInitialState);

  function handleSingleSelect(key: LifestyleSingleFieldKey, value: string) {
    setAnswers((prev) => ({
      ...prev,
      [key]: prev[key] === value ? "" : value,
    }));
  }

  function handleMultiSelect(key: LifestyleMultiFieldKey, value: string) {
    setAnswers((prev) => {
      const current = prev[key] as string[];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  }

  function handleSubmit() {
    // TODO: API 호출 — draft + answers를 서버에 전송하고, 생성된 게시글 ID로 이동
    void draft;
    clearDraft();
    toast.success("게시글이 등록되었어요");
    navigate("/board");
  }

  const isValid = isAllAnswered(answers);

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-bg-primary">
      <Header showBack title="룸메이트 모집하기" onBackClick={handleBackClick} />

      <div className="scrollbar-none min-h-0 flex-1 overflow-y-auto pb-[100px] pt-400">
        <div className="flex flex-col gap-2 px-400 pb-400">
          <h2 className="typo-h3 text-text-strong">
            내 체크리스트를 <br /> 확인해요
          </h2>
          <p className="typo-body2 text-text-alternative">룸메이트 매칭에 활용돼요</p>
        </div>

        <div className="flex flex-col gap-8.75 pt-400">
          {LIFESTYLE_SINGLE_QUESTIONS.slice(0, 2).map((question) => (
            <ChipQuestionSection
              key={question.key}
              title={question.label}
              options={question.options}
              selectedValues={answers[question.key] ? [answers[question.key] as string] : []}
              selectionType="single"
              onToggle={(value) => handleSingleSelect(question.key, value)}
            />
          ))}

          {LIFESTYLE_MULTI_QUESTIONS.map((question) => (
            <ChipQuestionSection
              key={question.key}
              helperText={question.helperText}
              title={question.label}
              options={question.options}
              selectedValues={answers[question.key] as string[]}
              selectionType="multi"
              onToggle={(value) => handleMultiSelect(question.key, value)}
            />
          ))}

          {LIFESTYLE_SINGLE_QUESTIONS.slice(2).map((question) => (
            <ChipQuestionSection
              key={question.key}
              title={question.label}
              options={question.options}
              selectedValues={answers[question.key] ? [answers[question.key] as string] : []}
              selectionType="single"
              onToggle={(value) => handleSingleSelect(question.key, value)}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-40 bg-bg-primary px-400 pb-9 pt-300">
        <Button className="w-full" disabled={!isValid} onClick={handleSubmit}>
          등록하기
        </Button>
      </div>
    </div>
  );
}

export { PostChecklistContent };
