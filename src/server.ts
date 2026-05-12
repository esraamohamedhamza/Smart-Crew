import { createStartServerHandler } from "@tanstack/react-start/server-handler";
import { getRouter } from "./router"; // تأكدي من وجود ملف router.tsx في نفس المسار أو عدلي المسار

// دالة بسيطة لعرض رسالة خطأ احترافية في حال حدوث فشل في السيرفر
function standardErrorResponse(): Response {
  return new Response(
    "<html><head><title>Server Error</title></head><body style='font-family:sans-serif; display:flex; align-items:center; justify-content:center; height:100vh; flex-direction:column;'><h1>500 - System Error</h1><p>Smart Crew AI is temporarily unavailable. Please try again later.</p></body></html>",
    {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    }
  );
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      // استخدام المعالج الرسمي لـ TanStack Start
      const handler = createStartServerHandler({
        createRouter: getRouter,
      });
      
      return await handler(request, env, ctx);
    } catch (error) {
      console.error("Critical SSR Error:", error);
      return standardErrorResponse();
    }
  },
};
