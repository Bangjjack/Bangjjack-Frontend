import { useEffect } from "react";

function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: () => void,
): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }

    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, [ref, handler]);
}

export { useClickOutside };
