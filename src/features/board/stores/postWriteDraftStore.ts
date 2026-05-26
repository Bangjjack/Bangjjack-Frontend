import { create } from "zustand";

import type { PostWriteFormValues } from "@/features/board/schemas/postWriteSchema";

interface PostWriteDraftState {
  draft: PostWriteFormValues | null;
  postId: number | null;
  clearDraft: () => void;
  setDraft: (values: PostWriteFormValues, postId?: number | null) => void;
}

export const usePostWriteDraftStore = create<PostWriteDraftState>((set) => ({
  draft: null,
  postId: null,
  clearDraft: () => set({ draft: null, postId: null }),
  setDraft: (values, postId = null) => set({ draft: values, postId }),
}));
