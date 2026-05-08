import { createFileRoute } from "@tanstack/react-router";
import { SuccessState } from "@/components/app/screens/SuccessState";

export const Route = createFileRoute("/_app/conflict/$id/success")({
  component: SuccessState,
});
