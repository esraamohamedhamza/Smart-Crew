import { useEffect, useState } from "react";

/**
 * Returns a stroke color for chart segments that adapts to the active theme.
 * - Light mode: a darker, slightly translucent stroke (mimics a 2-shade darker outline).
 * - Dark mode: a soft white glow (2-shade lighter outline).
 * Use across pies, bars, radar, etc. for consistent contrast.
 */
export function useSegmentStroke() {
  const [isDark, setIsDark] = useState(
    typeof document !== "undefined" && document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const obs = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark")),
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return {
    isDark,
    segStroke: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.30)",
    strokeWidth: 1.25,
  };
}
