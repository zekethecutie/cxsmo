import { useTheme } from "@/contexts/ThemeContext";
import { useCxsmoSound } from "@/contexts/CxsmoSoundContext";
import { CxsmoSoundToggle } from "@/components/CxsmoSoundToggle";
import "@/pages/cxsmo-av.css";

export function CxsmoAppearanceToggle() {
  const { theme, toggleThemeAt } = useTheme();
  const { play } = useCxsmoSound();
  const isDark = theme === "dark";
  const switchTheme = (event: React.MouseEvent<HTMLButtonElement>) => { const box = event.currentTarget.getBoundingClientRect(); play("theme"); toggleThemeAt?.({ x: box.left + box.width / 2, y: box.top + box.height / 2 }); };
  return <><button data-cxsmo-sound-silent className="cxsmo-appearance-toggle" type="button" aria-label={`Switch to ${isDark ? "light" : "dark"} mode`} aria-pressed={isDark} onClick={switchTheme}><span aria-hidden="true">{isDark ? "◐" : "◑"}</span><b>{isDark ? "Dark" : "Light"}</b></button><CxsmoSoundToggle /></>;
}
