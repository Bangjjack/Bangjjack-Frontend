import { useState } from "react";

type UseCounterOptions = {
  min?: number;
  max?: number;
  initial?: number;
};

function useCounter({ min = 0, max = Infinity, initial = min }: UseCounterOptions = {}) {
  const [count, setCount] = useState(initial);

  function increment() {
    setCount((prev) => Math.min(max, prev + 1));
  }

  function decrement() {
    setCount((prev) => Math.max(min, prev - 1));
  }

  return { count, setCount, increment, decrement } as const;
}

export { useCounter };
export type { UseCounterOptions };
