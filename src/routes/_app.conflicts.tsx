import { createFileRoute } from "@tanstack/react-router";
import { ConflictCenter } from "@/components/app/screens/ConflictCenter";

export const Route = createFileRoute("/_app/conflicts")({
  component: ConflictCenter,
});
