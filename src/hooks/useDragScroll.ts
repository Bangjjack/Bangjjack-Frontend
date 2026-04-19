import useEmblaCarousel from "embla-carousel-react";
import { useRef } from "react";

const DRAG_THRESHOLD = 5;

function useDragScroll() {
  const hasMoved = useRef(false);
  const startX = useRef(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
    duration: 20,
  });

  const onPointerDown = (e: React.PointerEvent) => {
    hasMoved.current = false;
    startX.current = e.clientX;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (Math.abs(e.clientX - startX.current) > DRAG_THRESHOLD) {
      hasMoved.current = true;
    }
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (hasMoved.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return {
    ref: emblaRef,
    api: emblaApi,
    handlers: {
      onPointerDown,
      onPointerMove,
      onClickCapture,
    },
  };
}

export { useDragScroll };
