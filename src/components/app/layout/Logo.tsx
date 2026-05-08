import logoUrl from "@/assets/saudia-logo-white.png";

/**
 * Saudia brand mark — white logo on Royal Green / dark sidebar.
 * Includes a subtle "Powered by Smart Crew AI" sub-text below the mark.
 */
export function Logo({ iconOnly = false }: { className?: string; iconOnly?: boolean }) {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2">
      <img
        src={logoUrl}
        alt="Saudia"
        className="block object-contain select-none"
        draggable={false}
        style={{
          height: iconOnly ? 40 : 64,
          width: "auto",
          filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.25))",
        }}
      />
      {!iconOnly && (
        <span
          className="text-white/60 select-none"
          style={{
            fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
            fontWeight: 300,
            fontSize: "10.5px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Powered by Smart Crew AI
        </span>
      )}
    </div>
  );
}
