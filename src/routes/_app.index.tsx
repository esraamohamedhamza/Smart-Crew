import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/app/screens/Dashboard";

export const Route = createFileRoute("/_app/")({
  component: Dashboard,
});
