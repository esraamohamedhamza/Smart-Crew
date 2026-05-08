import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { Sidebar } from "./Sidebar";
import { Menu, Moon, Sun, X, Bell, MessageSquare } from "lucide-react";
import { AutoHealIndicator } from "../shared/AutoHealIndicator";
import { SmartSearch } from "../shared/SmartSearch";

export function RootLayout() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-background">
      <div
        className="hidden lg:block"
        style={{ width: sidebarCollapsed ? "80px" : "260px", transition: "width 0.3s" }}
      >
        <Sidebar isCollapsed={sidebarCollapsed} />
      </div>

      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 bottom-0 w-64 z-50 lg:hidden">
            <Sidebar isCollapsed={false} />
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-card hover:bg-secondary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-border/60 bg-background/80 backdrop-blur-md flex items-center justify-between px-4 lg:px-6 gap-4 relative" style={{ zIndex: 60 }}>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-secondary"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:block p-2 rounded-lg hover:bg-secondary"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden md:flex flex-1 ml-2">
              <SmartSearch />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate({ to: "/notifications" })}
              className="relative p-2 rounded-lg hover:bg-secondary transition-colors"
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
            </button>
            <AutoHealIndicator />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto relative">
          <Outlet />
          <button
            onClick={() => navigate({ to: "/search" })}
            className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-elegant hover:opacity-90 transition-all flex items-center justify-center z-40 ai-glow"
            aria-label="AI Chat Assistant"
            title="AI Chat Assistant"
          >
            <MessageSquare className="w-6 h-6" />
          </button>
        </main>
      </div>
    </div>
  );
}
