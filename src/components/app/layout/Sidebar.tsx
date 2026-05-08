import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Plane,
  TrendingUp,
  Clock,
  AlertTriangle,
  UserCheck,
  Users,
  Calendar,
  Settings as SettingsIcon,
  User,
} from "lucide-react";
import { Logo } from "./Logo";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Plane, label: "Fleet View", path: "/fleet" },
  { icon: TrendingUp, label: "Advanced Analytics", path: "/analytics" },
  { icon: Clock, label: "Flight Timeline", path: "/timeline" },
  { icon: AlertTriangle, label: "Conflict Resolution", path: "/conflicts" },
  { icon: UserCheck, label: "Crew Match", path: "/crew/match" },
  { icon: Users, label: "Crew Profiles", path: "/crew/profiles" },
  { icon: Calendar, label: "Schedules", path: "/crew/availability" },
] as const;

export function Sidebar({ isCollapsed }: { isCollapsed: boolean }) {
  const location = useLocation();

  const NavItem = ({
    item,
  }: {
    item: { icon: typeof LayoutDashboard; label: string; path: string };
  }) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;

    return (
      <Link
        to={item.path as never}
        className={`relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
          isActive
            ? "bg-white/10 text-white font-medium shadow-[inset_0_0_18px_rgba(106,191,75,0.18)]"
            : "text-white/70 hover:text-white hover:bg-white/5"
        } ${isCollapsed ? "justify-center" : ""}`}
      >
        {isActive && (
          <span
            className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full"
            style={{ background: "#6ABF4B", boxShadow: "0 0 10px rgba(106,191,75,0.7)" }}
          />
        )}
        <Icon className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={1.5} />
        {!isCollapsed && <span className="truncate text-sm">{item.label}</span>}
      </Link>
    );
  };

  const settingsActive = location.pathname.startsWith("/settings");

  return (
    <div className="h-full flex flex-col bg-[#006937] dark:bg-[#003D20]">
      <div className={`border-b border-white/10 ${isCollapsed ? "px-2 py-5" : "px-4 py-6"}`}>
        <Logo iconOnly={isCollapsed} />
      </div>

      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item, i) => (
          <NavItem key={i} item={item} />
        ))}
      </div>

      {/* User profile + Settings beneath it (per spec) */}
      <div className="px-4 pt-4 pb-12 border-t border-white/10 space-y-2">
        <Link
          to="/profile"
          className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
            location.pathname === "/profile" ? "bg-white/10" : "hover:bg-white/5"
          }`}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "#6ABF4B" }}
          >
            <User className="w-4 h-4" style={{ color: "#006937" }} />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-medium truncate">John Anderson</div>
              <div className="text-white/60 text-xs truncate">Operations Manager</div>
            </div>
          )}
        </Link>

        <Link
          to="/settings"
          className={`relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
            settingsActive
              ? "bg-white/10 text-white font-medium shadow-[inset_0_0_18px_rgba(106,191,75,0.18)]"
              : "text-white/70 hover:text-white hover:bg-white/5"
          } ${isCollapsed ? "justify-center" : ""}`}
        >
          {settingsActive && (
            <span
              className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full"
              style={{ background: "#6ABF4B", boxShadow: "0 0 10px rgba(106,191,75,0.7)" }}
            />
          )}
          <SettingsIcon className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={1.5} />
          {!isCollapsed && <span className="truncate text-sm">Settings</span>}
        </Link>
      </div>
    </div>
  );
}
