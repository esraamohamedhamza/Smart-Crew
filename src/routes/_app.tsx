import { createFileRoute } from "@tanstack/react-router";
import { RootLayout } from "@/components/app/layout/RootLayout";

export const Route = createFileRoute("/_app")({
  component: RootLayout,
});
