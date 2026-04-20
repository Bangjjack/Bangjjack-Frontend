import { ImageIcon, UsersIcon } from "@/assets/icons";
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
  {
    description: "갤러리에서 사진을 선택하세요",
    icon: ImageIcon,
    iconBackgroundClassName: "bg-brand-secondary-light",
    iconClassName: "text-brand-secondary",
    id: "photo",
    title: "사진 보내기",
  },
];
