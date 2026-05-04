import { useState } from "react";

interface UseCounterOptions {
  min?: number;
  max?: number;
  initial?: number;
}

function useCounter({ min = 0, max = Infinity, initial = min }: UseCounterOptions = {}) {
  const safeMax = Math.max(min, max);
  const [count, setCount] = useState(Math.max(min, Math.min(safeMax, initial)));

  function increment() {
    setCount((prev) => Math.min(safeMax, prev + 1));
  }

  function decrement() {
    setCount((prev) => Math.max(min, prev - 1));
  }

  return { count, setCount, increment, decrement } as const;
}

export { useCounter };
export type { UseCounterOptions };
