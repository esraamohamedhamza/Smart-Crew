import { ArrowLeft } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

/**
 * Smart Back — uses TanStack router history first (for proper SPA state changes),
 * falls back to window.history.back(), and finally to "/" if there is no history.
 * Icon-only for premium aesthetic.
 */
export function BackButton({ className = "" }: { className?: string }) {
  const router = useRouter();

  const onClick = () => {
    try {
      // Prefer router-aware navigation so loaders + state are properly invalidated.
      router.history.back();
      return;
    } catch {
      // ignore and fall through
    }
    if (typeof window !== "undefined") {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = "/";
      }
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Go back"
      title="Back"
      className={`inline-flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors ${className}`}
    >
      <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
    </button>
  );
}
