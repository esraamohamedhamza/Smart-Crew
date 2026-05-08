/**
 * Shared Recharts tooltip styling — Royal Blue surface with white text.
 * Use across every chart for cohesive Saudia brand experience.
 */
export const tooltipProps = {
  cursor: { fill: "rgba(0, 40, 86, 0.06)" },
  contentStyle: {
    backgroundColor: "#002856",
    border: "1px solid #003D7A",
    borderRadius: "8px",
    color: "#FFFFFF",
    boxShadow: "0 8px 24px rgba(0, 40, 86, 0.18)",
  } as const,
  labelStyle: { color: "#FFFFFF", fontWeight: 600 } as const,
  itemStyle: { color: "#FFFFFF" } as const,
};
