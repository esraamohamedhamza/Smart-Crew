import { createApp } from "vinxi";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default createApp({
  routers: [
    {
      name: "client",
      type: "client",
      handler: "./src/start.ts",
      plugins: () => [
        TanStackRouterVite(),
        react(),
        tailwindcss(),
        tsconfigPaths(),
      ],
      vite: {
        resolve: {
          alias: {
            // تحويل استيراد الـ async_hooks لملف وهمي في المتصفح لمنع خطأ البناء تماماً
            "node:async_hooks": "unenv/runtime/mock/proxy",
            "async_hooks": "unenv/runtime/mock/proxy"
          }
        }
      }
    },
  ],
});
