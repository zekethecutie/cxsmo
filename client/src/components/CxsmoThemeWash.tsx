import { createPortal } from "react-dom";

import { useTheme } from "@/contexts/ThemeContext";

/** A document-level theme reveal so no routed page can clip or out-stack it. */
export function CxsmoThemeWash() {
  const { isTransitioning, transitionTarget } = useTheme();
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className={`cxsmo-theme-wash${isTransitioning ? " is-active" : ""}`} data-target={transitionTarget} aria-hidden="true" />,
    document.body,
  );
}
