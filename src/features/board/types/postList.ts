import type { PostListItem, RecommendedPostItem } from "./post";

type BoardPageContentProps = {
  aiRecommend: boolean;
  isOnboardingCompleted: boolean;
  onAiRecommendChange: (value: boolean) => void;
  onPostClick?: (id: number) => void;
  onWriteClick?: () => void;
};

type PostListProps = {
  posts: PostListItem[];
  isFetching: boolean;
  isError: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  onPostClick?: (id: number) => void;
};

type RecommendedPostListProps = {
  posts: RecommendedPostItem[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
  onPostClick?: (id: number) => void;
};

export type { BoardPageContentProps, PostListProps, RecommendedPostListProps };
