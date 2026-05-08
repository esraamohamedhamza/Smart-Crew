import { createFileRoute } from "@tanstack/react-router";
import { UserProfile } from "@/components/app/screens/UserProfile";

export const Route = createFileRoute("/_app/profile")({
  component: UserProfile,
});
