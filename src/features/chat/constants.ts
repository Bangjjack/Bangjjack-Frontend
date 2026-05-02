import { UsersIcon } from "@/assets/icons";
import type { ChatInputMenuItem } from "@/features/chat/types";

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
