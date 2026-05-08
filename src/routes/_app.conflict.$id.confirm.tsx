import { createFileRoute } from "@tanstack/react-router";
import { ResolutionConfirm } from "@/components/app/screens/ResolutionConfirm";

export const Route = createFileRoute("/_app/conflict/$id/confirm")({
  component: ResolutionConfirm,
});
