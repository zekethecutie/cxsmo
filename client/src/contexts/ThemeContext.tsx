import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme?: () => void;
  toggleThemeAt?: (origin: { x: number; y: number }) => void;
  switchable: boolean;
  isTransitioning: boolean;
  transitionTarget: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = false,
}: ThemeProviderProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState<Theme>(defaultTheme);
  const [theme, setTheme] = useState<Theme>(() => {
    if (switchable) {
      const previewTheme = new URLSearchParams(window.location.search).get("appearance");
      if (previewTheme === "dark" || previewTheme === "light") return previewTheme;
      const stored = localStorage.getItem("theme");
      return (stored as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    if (switchable) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, switchable]);

  const performToggle = (origin?: { x: number; y: number }) => {
        const nextTheme = theme === "light" ? "dark" : "light";
        document.documentElement.style.setProperty("--cxsmo-eclipse-x", `${origin?.x ?? window.innerWidth - 74}px`);
        document.documentElement.style.setProperty("--cxsmo-eclipse-y", `${origin?.y ?? 72}px`);
        setTransitionTarget(nextTheme);
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setTheme(nextTheme); return; }
        setIsTransitioning(true);
        window.setTimeout(() => setTheme(nextTheme), 170);
        window.setTimeout(() => setIsTransitioning(false), 820);
      };
  const toggleTheme = switchable ? () => performToggle() : undefined;
  const toggleThemeAt = switchable ? (origin: { x: number; y: number }) => performToggle(origin) : undefined;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, toggleThemeAt, switchable, isTransitioning, transitionTarget }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
