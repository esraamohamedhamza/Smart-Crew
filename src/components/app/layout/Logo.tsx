import logoUrl from "@/assets/saudia-logo-white.png";

/**
 * Saudia brand mark — white logo on Royal Green sidebar.
 * Centered hero presentation, transparent background.
 */
export function Logo({ iconOnly = false }: { className?: string; iconOnly?: boolean }) {
  return (
    <div className="w-full flex items-center justify-center">
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
    </div>
  );
}
