import type { ComponentType, SVGProps } from "react";

import {
  BookOpenTextIcon,
  SoapDispenserDropletIcon,
  ThermometerIcon,
  UsersIcon,
  WindIcon,
} from "@/assets/icons";
import type { ChatInputMenuItem } from "@/features/chat/types";

export type GuideChecklistItem = {
  category: string;
  checked: boolean;
  label: string;
  required: boolean;
};

export type CoordinationItem = {
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
};

export type ConversationTopic = {
  prompt: string;
  title: string;
};

export const CHAT_INPUT_MENU_ITEMS: ChatInputMenuItem[] = [
  {
    description: "공식 룸메이트 요청을 보내세요",
    icon: UsersIcon,
    iconBackgroundClassName: "bg-brand-primary-light",
    iconClassName: "text-brand-primary",
    id: "invite",
    title: "룸메이트 초대 요청",
  },
];

export const SHARED_LIFE_CHECKLIST_ITEMS: GuideChecklistItem[] = [
  {
    category: "취침 시간",
    checked: true,
    label: "기상·취침 시간 공유하기",
    required: true,
  },
  {
    category: "청소",
    checked: true,
    label: "공용공간 청소 분담 정하기",
    required: true,
  },
  {
    category: "공간",
    checked: true,
    label: "냉장고 공간 나누기",
    required: true,
  },
  {
    category: "생활품",
    checked: true,
    label: "공용 생활품 구매 방식 정하기",
    required: false,
  },
  {
    category: "소음",
    checked: false,
    label: "소음·음악 허용 시간대 설정",
    required: false,
  },
];

export const SHARED_LIFE_COORDINATION_ITEMS: CoordinationItem[] = [
  {
    description:
      "아침에 겹치면 서로 불편해요. 주로 쓰는 시간대를 미리 알려두면 충돌을 피할 수 있어요.",
    icon: SoapDispenserDropletIcon,
    title: "샤워·욕실 사용 시간",
  },
  {
    description: "집중 시간대를 서로 알면 배려하기 쉬워요.",
    icon: BookOpenTextIcon,
    title: "공부 공간",
  },
  {
    description: "취식 후 환기 여부, 냄새 강한 음식에 대한 민감도를 확인해두면 마찰이 줄어요.",
    icon: WindIcon,
    title: "음식 냄새·환기",
  },
  {
    description:
      "더위·추위 체감이 달라서 의외로 많이 싸우는 항목이에요. 적정 온도 범위를 미리 정해두면 좋아요.",
    icon: ThermometerIcon,
    title: "에어컨·난방 온도",
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
