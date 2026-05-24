import { useState } from "react";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    "matchMedia" in window &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export const useInputMenuState = () => {
  const [inputMenuOpen, setInputMenuOpen] = useState(false);
  const [inputMenuClosing, setInputMenuClosing] = useState(false);

  const openInputMenu = () => {
    setInputMenuClosing(false);
    setInputMenuOpen(true);
  };

  const completeInputMenuClose = () => {
    setInputMenuClosing(false);
    setInputMenuOpen(false);
  };

  const closeInputMenu = () => {
    if (!inputMenuOpen || inputMenuClosing) {
      return;
    }

    setInputMenuClosing(true);

    if (prefersReducedMotion()) {
      completeInputMenuClose();
    }
  };

  const toggleInputMenu = () => {
    if (inputMenuOpen) {
      closeInputMenu();
      return;
    }

    openInputMenu();
  };

  return {
    closeInputMenu,
    completeInputMenuClose,
    inputMenuClosing,
    inputMenuOpen,
    toggleInputMenu,
  };
};
