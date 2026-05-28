import { useEffect, useRef } from "react";

function useInfiniteScroll(
  fetchNextPage: () => void,
  {
    hasNextPage,
    isFetchingNextPage,
  }: { hasNextPage: boolean | undefined; isFetchingNextPage: boolean },
) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return sentinelRef;
}

export { useInfiniteScroll };
