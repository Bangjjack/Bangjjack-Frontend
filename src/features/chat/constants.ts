import type { ComponentType, SVGProps } from "react";

import {
  FanIcon,
  MoonIcon,
  BrushCleaningIcon,
  SquareArrowRightExitIcon,
  ThermometerIcon,
  UsersIcon,
} from "@/assets/icons";
import type { ChatInputMenuItem, ChatTab } from "@/features/chat/types";

export const CHAT_TAB_CATEGORY = {
  all: undefined,
  roommateRequest: "APPLICATION",
} as const satisfies Record<ChatTab, "APPLICATION" | undefined>;

export const CHAT_TABS: Array<{ key: ChatTab; label: string }> = [
  { key: "all", label: "전체" },
  { key: "roommateRequest", label: "룸메이트 요청" },
];

export const CHAT_HELPER_TEXT = "매칭된 룸메이트에게 먼저 말을 걸어보세요.";

export type GuideChecklistItem = {
  category: string;
  label: string;
  required: boolean;
};

export type CoordinationItem = {
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  leftLabel: string;
  rightLabel: string;
  title: string;
};

export type ConversationTopic = {
  prompt: string;
  title: string;
};

export const CHAT_INPUT_MENU_ITEMS: ChatInputMenuItem[] = [
  {
    description: "모집글 작성자에게 룸메이트 요청을 보낼 수 있어요",
    icon: UsersIcon,
    iconBackgroundClassName: "bg-brand-primary-light",
    iconClassName: "text-brand-primary",
    id: "invite",
    title: "룸메이트 요청 보내기",
  },
  {
    description: "대화 내역을 다시 확인하기 어려워요",
    icon: SquareArrowRightExitIcon,
    iconBackgroundClassName: "bg-state-error-light",
    iconClassName: "text-state-error",
    id: "leave",
    title: "채팅방 나가기",
  },
];

export const SHARED_LIFE_CHECKLIST_ITEMS: GuideChecklistItem[] = [
  {
    category: "취침 시간",
    label: "기상·취침 시간 공유하기",
    required: true,
  },
  {
    category: "청소",
    label: "공용공간 청소 분담 정하기",
    required: true,
  },
  {
    category: "공간",
    label: "냉장고 공간 나누기",
    required: true,
  },
  {
    category: "생활품",
    label: "공용 생활품 구매 방식 정하기",
    required: false,
  },
  {
    category: "소음",
    label: "소음·음악 허용 시간대 설정",
    required: false,
  },
];

export const SHARED_LIFE_COORDINATION_ITEMS: CoordinationItem[] = [
  {
    description:
      "청소 담당과 청소 방식에 대해 미리 이야기 나눠보세요. 역할 분담을 정하면 갈등을 줄일 수 있어요.",
    icon: BrushCleaningIcon,
    leftLabel: "가끔",
    rightLabel: "거의 매일",
    title: "청소 주기",
  },
  {
    description: "취침 시간대가 달라요. 늦게 자는 경우 조명·소음 기준을 미리 정해두면 서로 편해요.",
    icon: MoonIcon,
    leftLabel: "새벽 2시 이후",
    rightLabel: "밤 11시 전",
    title: "취침·기상 시간",
  },
  {
    description: "적정 온도 범위를 미리 정해두거나, 각자 방에서 조절하는 방식으로 합의해보아요.",
    icon: ThermometerIcon,
    leftLabel: "더위 예민",
    rightLabel: "추위 예민",
    title: "에어컨·난방 온도",
  },
  {
    description: "취식 후 환기 여부, 강한 냄새 음식에 대한 기준을 확인해두면 마찰이 줄어요.",
    icon: FanIcon,
    leftLabel: "냄새 예민",
    rightLabel: "무관",
    title: "음식 냄새·환기",
  },
];

export const SHARED_LIFE_CONVERSATION_TOPICS: ConversationTopic[] = [
  {
    prompt: "“보통 몇 시에 일어나? 아침에 샤워해?”",
    title: "서로의 하루 루틴을 소개해요.",
  },
  {
    prompt: "“냄새 강한 음식 괜찮아? 나는 강한 향은 좀 불호야.”",
    title: "서로 싫어하는 건 솔직하게 말해요.",
  },
  {
    prompt: "“불편한 게 생기면 바로 말해줘. 나도 그럴게.”",
    title: "불편할 때 말하는 방식을 정해봐요.",
  },
  {
    prompt: "“같이 노래 듣고 공부하면 좋겠다.”",
    title: "같이 하고 싶은 것들을 공유해요.",
  },
];

export const CHAT_ROOM_LIST_DEFAULT_CATEGORY = "all" as const;
