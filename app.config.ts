import { createApp } from "vinxi";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default createApp({
  routers: [
    {
      name: "client",
      type: "client",
      handler: "./src/start.ts",
      plugins: () => [
        nodePolyfills({
          // بنحدد فقط الحزمة اللي مسببة الأزمة من غير ما نلمس الـ process عشان نمنع تضارب unenv
          include: ["async_hooks"],
          globals: {
            Buffer: false,
            process: false,
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
