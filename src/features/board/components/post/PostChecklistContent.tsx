import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { isAxiosError } from "axios";

import { Button, ChipQuestionSection, Header } from "@/components/ui";
import { toast } from "@/components/ui";
import { LIFESTYLE_MULTI_QUESTIONS, LIFESTYLE_SINGLE_QUESTIONS } from "@/constants";
import type { LifestyleMultiFieldKey, LifestyleSingleFieldKey } from "@/constants";
import { useGoBack } from "@/hooks";
import { useCreatePost, useUpdatePost } from "@/features/board/hooks";
import { useUpdateUserChecklist, useUserChecklist } from "@/features/user/hooks";
import { mapFormToCreatePostRequest } from "@/features/board/utils";
import { apiChecklistToFormState, formStateToApiChecklist } from "@/features/board/utils";
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
  const { draft, postId, clearDraft } = usePostWriteDraftStore();
  const handleBackClick = useGoBack(postId ? `/board/${postId}/edit` : "/board/write");

  const { data: checklistData } = useUserChecklist();
  const { mutate: createPost, isPending: isCreatePending } = useCreatePost();
  const { mutate: updatePost, isPending: isUpdatePending } = useUpdatePost(postId ?? 0);
  const { mutate: updateChecklist, isPending: isChecklistPending } = useUpdateUserChecklist();

  const [answers, setAnswers] = useState<ChecklistState>(getInitialState);
  const [originalAnswers, setOriginalAnswers] = useState<ChecklistState | null>(null);

  useEffect(() => {
    if (checklistData && originalAnswers === null) {
      const loaded = apiChecklistToFormState(checklistData);
      setAnswers(loaded);
      setOriginalAnswers(loaded);
    }
  }, [checklistData, originalAnswers]);

  const isDirty =
    originalAnswers !== null &&
    JSON.stringify(answers) !== JSON.stringify(originalAnswers);

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

  function submitPost() {
    if (!draft) return;
    const postBody = mapFormToCreatePostRequest(draft);

    if (postId) {
      updatePost(postBody, {
        onSuccess: () => {
          clearDraft();
          toast.success("게시글이 수정되었어요");
          navigate(`/board/${postId}`);
        },
        onError: () => {
          toast.error("게시글 수정에 실패했어요");
        },
      });
    } else {
      createPost(postBody, {
        onSuccess: (data) => {
          clearDraft();
          toast.success("게시글이 등록되었어요");
          navigate(data.postId ? `/board/${data.postId}` : "/board");
        },
        onError: (error) => {
          if (isAxiosError(error) && error.response?.status === 409) {
            toast.error("이미 작성한 게시글이 있어요");
          } else {
            toast.error("게시글 등록에 실패했어요");
          }
        },
      });
    }
  }

  function handleSubmit() {
    if (isDirty) {
      updateChecklist(formStateToApiChecklist(answers), {
        onSuccess: submitPost,
        onError: () => {
          toast.error("체크리스트 수정에 실패했어요");
        },
      });
    } else {
      submitPost();
    }
  }

  const isValid = isAllAnswered(answers);
  const isPending = isCreatePending || isUpdatePending || isChecklistPending;

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
        <Button className="w-full" disabled={!isValid || isPending} onClick={handleSubmit}>
          {postId ? "수정하기" : "등록하기"}
        </Button>
      </div>
    </div>
  );
}

export { PostChecklistContent };
