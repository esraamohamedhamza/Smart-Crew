import { createStart, createMiddleware } from "@tanstack/react-start";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error("Critical Start Error:", error);
    
    // رسالة خطأ بسيطة في حال فشل النظام
    return new Response(
      "<html><head><title>Smart Crew | Alert</title></head><body style='font-family:sans-serif; display:flex; align-items:center; justify-content:center; height:100vh; flex-direction:column; background:#0B1221; color:#fff;'><h1>System Error</h1><p>Smart Crew AI is recovering from a temporary glitch.</p><button onclick='location.reload()' style='padding:10px 20px; cursor:pointer;'>Retry</button></body></html>",
      {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      }
    );
  }
});

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware],
}));
