import { createApp } from "vinxi";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nodePolyfills } from "vite-plugin-node-polyfills"; // 1. بنستدعي العدّة هنا

export default createApp({
  routers: [
    {
      name: "client",
      type: "client",
      handler: "./src/start.ts",
      plugins: () => [
        nodePolyfills({
          // 2. بنشغل العدّة هنا عشان تحمي الـ Build من خطأ الـ async_hooks
          include: ["async_hooks"],
          globals: {
            Buffer: true,
            process: true,
          },
        }),
        TanStackRouterVite(),
        react(),
        tailwindcss(),
        tsconfigPaths(),
      ],
    },
  ],
});
