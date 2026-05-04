import { create } from "zustand";

import type { PostWriteFormValues } from "@/features/board/schemas/postWriteSchema";

interface PostWriteDraftState {
  draft: PostWriteFormValues | null;
  clearDraft: () => void;
  setDraft: (values: PostWriteFormValues) => void;
}

export const usePostWriteDraftStore = create<PostWriteDraftState>((set) => ({
  draft: null,
  clearDraft: () => set({ draft: null }),
  setDraft: (values) => set({ draft: values }),
}));
