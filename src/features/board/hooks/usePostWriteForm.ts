import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { postWriteSchema, type PostWriteFormValues } from "@/features/board/schemas";
import {
  DEFAULT_MAX_MEMBER,
  EMPTY_POST_FORM_VALUES,
  ROOM_TYPE_MAX_MEMBER,
} from "@/features/board/constants";

interface UsePostWriteFormParams {
  defaultValues?: PostWriteFormValues;
  onSubmit: (data: PostWriteFormValues) => void;
}

export function usePostWriteForm({ defaultValues, onSubmit }: UsePostWriteFormParams) {
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
    defaultValues: defaultValues ?? EMPTY_POST_FORM_VALUES,
  });

  const title = watch("title");
  const memberCount = watch("memberCount");
  const roomType = watch("roomType");
  const intro = watch("intro");
  const habits = watch("habits");

  const maxMember = ROOM_TYPE_MAX_MEMBER[roomType] ?? DEFAULT_MAX_MEMBER;

  function handleRoomTypeSelect(option: string) {
    const newRoomType = roomType === option ? "" : option;
    setValue("roomType", newRoomType, { shouldValidate: true });

    const newMax = ROOM_TYPE_MAX_MEMBER[newRoomType] ?? DEFAULT_MAX_MEMBER;
    if (memberCount > newMax) {
      setValue("memberCount", newMax, { shouldValidate: true });
    }
  }

  function incrementMemberCount() {
    setValue("memberCount", Math.min(maxMember, memberCount + 1), { shouldValidate: true });
  }

  function decrementMemberCount() {
    setValue("memberCount", Math.max(1, memberCount - 1), { shouldValidate: true });
  }

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

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    isValid,
    errors,
    title,
    memberCount,
    roomType,
    intro,
    habits,
    maxMember,
    handleRoomTypeSelect,
    incrementMemberCount,
    decrementMemberCount,
    handleHabitSelect,
  };
}
