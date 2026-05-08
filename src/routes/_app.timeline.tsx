import { createFileRoute } from "@tanstack/react-router";
import { GanttTimeline } from "@/components/app/screens/GanttTimeline";

export const Route = createFileRoute("/_app/timeline")({
  component: GanttTimeline,
});
