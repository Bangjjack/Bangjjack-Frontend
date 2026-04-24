import { useEffect, useRef } from "react";

function useFadeInOnScroll<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            intersectionObserver.unobserve(el);
          }
        }
      },
      { threshold: 0.1, root: null },
    );

    function prepareChild(child: HTMLElement) {
      child.style.opacity = "0";
      child.style.transform = "translateY(12px)";
      child.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      intersectionObserver.observe(child);
    }

    for (const child of Array.from(container.children) as HTMLElement[]) {
      prepareChild(child);
    }

    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of Array.from(mutation.addedNodes)) {
          if (node instanceof HTMLElement) {
            prepareChild(node);
          }
        }
      }
    });

    mutationObserver.observe(container, { childList: true });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return ref;
}

export { useFadeInOnScroll };
