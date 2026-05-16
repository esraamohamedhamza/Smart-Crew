import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    tailwindcss(),
    tsconfigPaths(),
    {
      name: "skip-async-hooks-for-browser",
      enforce: "pre",
      resolveId(source) {
        // لو أي حزمة طلبت المكتبة دي، هنفهم الفايل إنه رايح لملف وهمي
        if (source === "node:async_hooks" || source === "async_hooks") {
          return "\0browser-async-hooks";
        }
      },
      load(id) {
        // بنعمل Fake Export للـ AsyncLocalStorage عشان الفايل يبني بدون أخطاء
        if (id === "\0browser-async-hooks") {
          return "export class AsyncLocalStorage { disable() {}; enable() {}; enterWith() {}; run(store, callback) { return callback(); }; getStore() { return undefined; } };";
        }
      },
    },
  ],
});
