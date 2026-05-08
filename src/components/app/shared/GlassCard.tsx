import { ReactNode, HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

/**
 * Premium glass surface — semi-transparent card backed by backdrop blur.
 * Sits gracefully over both light and dark backgrounds.
 */
export function GlassCard({ children, className = "", hover = false, ...rest }: GlassCardProps) {
  return (
    <div
      {...rest}
      className={`bg-card/70 dark:bg-card/60 backdrop-blur-xl rounded-lg border border-border dark:border-white/10 shadow-card-soft ${
        hover ? "hover:border-accent/50 hover:shadow-elegant transition-all" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
