import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// بنصدر الكائن الهيكلي مباشرة بدون استخدام دالة defineConfig المقفولة
export default {
  routers: {
    client: {
      plugins: () => [
        TanStackRouterVite(),
        react(),
        tailwindcss(),
        tsconfigPaths(),
      ],
    },
  },
};
