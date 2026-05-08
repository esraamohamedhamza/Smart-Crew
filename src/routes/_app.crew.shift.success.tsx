import { createFileRoute } from "@tanstack/react-router";
import { ShiftSuccess } from "@/components/app/screens/ShiftSuccess";

export const Route = createFileRoute("/_app/crew/shift/success")({
  component: ShiftSuccess,
});
