import { createFileRoute } from "@tanstack/react-router";
import { Notifications } from "@/components/app/screens/Notifications";

export const Route = createFileRoute("/_app/notifications")({
  component: Notifications,
});
