"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export type CursorType =
  | "default"
  | "hover"
  | "project"
  | "drag"
  | "text"
  | "hidden";

interface CursorContextType {
  cursorType: CursorType;
  cursorText: string | null;
  setCursor: (type: CursorType, text?: string | null) => void;
  resetCursor: () => void;
  isEnabled: boolean;
}

const CursorContext = createContext<CursorContextType>({
  cursorType: "default",
  cursorText: null,
  setCursor: () => {},
  resetCursor: () => {},
  isEnabled: false,
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  const setCursor = useCallback((type: CursorType, text?: string | null) => {
    setCursorType(type);
    setCursorText(text ?? null);
  }, []);

  const resetCursor = useCallback(() => {
    setCursorType("default");
    setCursorText(null);
  }, []);

  useEffect(() => {
    // Only enable on desktop pointer devices with fine pointer and no reduced-motion
    if (typeof window === "undefined") return;

    const hasFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!hasFinePointer || prefersReducedMotion) {
      return;
    }

    setIsEnabled(true);
    document.documentElement.classList.add("custom-cursor-enabled");

    // Global event delegation for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 1. Explicit data-cursor takes precedence
      const cursorTarget = target.closest<HTMLElement>("[data-cursor]");
      if (cursorTarget) {
        const type = (cursorTarget.dataset.cursor as CursorType) || "hover";
        const text = cursorTarget.dataset.cursorText || null;
        setCursor(type, text);
        return;
      }

      // 2. Form inputs & editable fields
      const inputTarget = target.closest("input, textarea, [contenteditable='true']");
      if (inputTarget) {
        setCursor("text");
        return;
      }

      // 3. Clickable elements: links, buttons, role=button, tabs, pills, chips, etc.
      const clickableTarget = target.closest(
        "a, button, [role='button'], select, summary, label, input[type='checkbox'], input[type='radio'], .cursor-pointer, [data-clickable='true']"
      );
      if (clickableTarget) {
        setCursor("hover");
        return;
      }

      // 4. Fallback to default
      resetCursor();
    };

    const handleMouseLeave = () => {
      setCursor("hidden");
    };

    const handleMouseEnter = () => {
      resetCursor();
    };

    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [setCursor, resetCursor]);

  return (
    <CursorContext.Provider
      value={{ cursorType, cursorText, setCursor, resetCursor, isEnabled }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  return useContext(CursorContext);
}
