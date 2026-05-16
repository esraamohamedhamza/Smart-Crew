import { createApp } from "vinxi";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// استخدام المدخل المباشر لـ Vinxi لإنشاء تطبيق SPA/SSR متوافق 100%
export default createApp({
  routers: [
    {
      name: "client",
      type: "spa", // أو نحدد نوع الـ router حسب معمارية القالب
      handler: "./index.html", // الفريمورك بيتعامل معاها داخلياً كـ entry
      plugins: () => [
        TanStackRouterVite(),
        react(),
        tailwindcss(),
        tsconfigPaths(),
      ],
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
