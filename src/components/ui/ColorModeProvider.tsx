"use client";

import { useEffect } from "react";
import { useResumeStore } from "@/store/useResumeStore";

/**
 * Reads colorMode from Zustand store and sets data-color-mode on <html>.
 * Must be rendered inside the store provider (client component).
 */
export function ColorModeProvider() {
  const colorMode = useResumeStore((s) => s.ui.colorMode);

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", colorMode);
  }, [colorMode]);

  return null;
}
