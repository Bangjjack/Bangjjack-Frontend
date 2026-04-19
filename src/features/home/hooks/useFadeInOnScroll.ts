import { useEffect, useRef } from "react";

function useFadeInOnScroll<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.1, root: null },
    );

    for (const child of children) {
      child.style.opacity = "0";
      child.style.transform = "translateY(12px)";
      child.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      observer.observe(child);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}

export { useFadeInOnScroll };
