import { useTheme } from "@/contexts/ThemeContext";

export function CxsmoAppearanceToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return <button className="cxsmo-appearance-toggle" type="button" aria-label={`Switch to ${isDark ? "light" : "dark"} mode`} aria-pressed={isDark} onClick={toggleTheme}><span aria-hidden="true">{isDark ? "◐" : "◑"}</span><b>{isDark ? "Dark" : "Light"}</b></button>;
}
