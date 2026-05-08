import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Sparkles, Plane, Users, AlertTriangle, ArrowRight, LayoutDashboard } from "lucide-react";

type SearchEntity = {
  id: string;
  type: "Page" | "Flight" | "Crew" | "Aircraft" | "Conflict";
  title: string;
  subtitle: string;
  to: string;
  keywords?: string;
};

const SEARCH_INDEX: SearchEntity[] = [
  // Pages — typed names jump straight there on Enter
  { id: "p-dash", type: "Page", title: "Dashboard", subtitle: "Main operational overview", to: "/", keywords: "home main" },
  { id: "p-fleet", type: "Page", title: "Fleet View", subtitle: "Aircraft & backup availability", to: "/fleet", keywords: "aircraft fleet overview" },
  { id: "p-analytics", type: "Page", title: "Advanced Analytics", subtitle: "KPIs, charts, performance", to: "/analytics", keywords: "kpi report metrics" },
  { id: "p-timeline", type: "Page", title: "Flight Timeline", subtitle: "Gantt schedule view", to: "/timeline", keywords: "gantt schedule" },
  { id: "p-delayed", type: "Page", title: "Delayed Flights", subtitle: "Delayed flights & risk", to: "/delayed", keywords: "delays late" },
  { id: "p-conflicts", type: "Page", title: "Conflict Resolution", subtitle: "Operational conflicts center", to: "/conflicts", keywords: "issues incidents" },
  { id: "p-match", type: "Page", title: "Crew Match", subtitle: "AI crew matching", to: "/crew/match", keywords: "match assign" },
  { id: "p-profiles", type: "Page", title: "Crew Profiles", subtitle: "All crew members", to: "/crew/profiles", keywords: "pilots officers" },
  { id: "p-avail", type: "Page", title: "Schedules", subtitle: "Crew availability grid", to: "/crew/availability", keywords: "availability roster" },
  { id: "p-notif", type: "Page", title: "Notifications", subtitle: "Alerts & messages", to: "/notifications" },
  { id: "p-settings", type: "Page", title: "Settings", subtitle: "Platform preferences", to: "/settings" },
  { id: "p-autoheal", type: "Page", title: "Auto-Heal", subtitle: "AI auto-resolution config", to: "/settings/auto-heal", keywords: "ai auto heal" },
  { id: "p-help", type: "Page", title: "Help & Support", subtitle: "Documentation & contact", to: "/help" },

  // Flights
  { id: "AA-1523", type: "Flight", title: "AA-1523", subtitle: "JFK → LHR • In Flight", to: "/flight/AA-1523" },
  { id: "DL-8847", type: "Flight", title: "DL-8847", subtitle: "LAX → NRT • On-Time", to: "/flight/DL-8847" },
  { id: "BA-2103", type: "Flight", title: "BA-2103", subtitle: "LHR → DXB • Delayed -45m", to: "/flight/BA-2103" },
  { id: "EK-7734", type: "Flight", title: "EK-7734", subtitle: "DXB → SFO • On-Time", to: "/flight/EK-7734" },
  // Aircraft
  { id: "SV-1523", type: "Aircraft", title: "SV-1523", subtitle: "Boeing 787-9 • In-Flight", to: "/flight/SV-1523" },
  { id: "SV-2103", type: "Aircraft", title: "SV-2103", subtitle: "Airbus A321neo • Standby", to: "/flight/SV-2103" },
  { id: "SV-6612", type: "Aircraft", title: "SV-6612", subtitle: "Boeing 777-300ER • Maintenance", to: "/flight/SV-6612" },
  // Crew
  { id: "CR-1001", type: "Crew", title: "Captain Sarah Chen", subtitle: "Senior Captain • Boeing 787-9", to: "/crew/assign/CR-1001" },
  { id: "CR-1002", type: "Crew", title: "Captain Alex Rivera", subtitle: "Captain • Boeing 787-9", to: "/crew/assign/CR-1002" },
  { id: "CR-1003", type: "Crew", title: "Captain Mike Torres", subtitle: "Captain • Boeing 787-9", to: "/crew/assign/CR-1003" },
  { id: "CR-1004", type: "Crew", title: "F/O Emily Watson", subtitle: "First Officer • Airbus A350", to: "/crew/assign/CR-1004" },
  // Conflicts
  { id: "CF-2401", type: "Conflict", title: "CF-2401", subtitle: "Crew Shortage • Auto-Resolved", to: "/conflict/CF-2401/scenarios" },
  { id: "CF-2402", type: "Conflict", title: "CF-2402", subtitle: "Schedule Overlap • Pending", to: "/conflict/CF-2402/scenarios" },
  { id: "CF-2403", type: "Conflict", title: "CF-2403", subtitle: "Maintenance Delay • Review", to: "/conflict/CF-2403/scenarios" },
];

const TYPE_ICON = {
  Page: LayoutDashboard,
  Flight: Plane,
  Aircraft: Plane,
  Crew: Users,
  Conflict: AlertTriangle,
};

const TYPE_TINT: Record<SearchEntity["type"], string> = {
  Page: "text-primary",
  Flight: "text-primary",
  Aircraft: "text-info",
  Crew: "text-accent",
  Conflict: "text-destructive",
};

export function SmartSearch() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SEARCH_INDEX.slice(0, 6);
    return SEARCH_INDEX.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.subtitle.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        (r.keywords?.toLowerCase().includes(q) ?? false),
    ).slice(0, 8);
  }, [query]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  const go = (entity: SearchEntity) => {
    setOpen(false);
    setQuery("");
    navigate({ to: entity.to as never });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex < results.length) {
        go(results[activeIndex]);
      } else {
        // Last item is "Ask AI"
        setOpen(false);
        navigate({ to: "/search" });
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <div className="relative">
        <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" strokeWidth={1.5} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onKeyDown={onKeyDown}
          placeholder="Smart search for flights, crew, or AI insights..."
          className="w-full h-10 pl-10 pr-4 rounded-lg bg-secondary/60 border border-border text-sm font-light placeholder:text-muted-foreground/70 focus:outline-none focus:border-accent/60 focus:bg-background transition-colors"
          style={{ fontWeight: 300, letterSpacing: "0.01em" }}
        />
      </div>

      {open && (
        <div className="absolute left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-elegant overflow-hidden" style={{ zIndex: 99999 }}>
          <div className="px-3 py-2 text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border bg-secondary/40">
            {query ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Quick access"}
          </div>
          <div className="max-h-[60vh] overflow-y-auto py-1">
            {results.length === 0 && (
              <div className="px-4 py-6 text-sm text-muted-foreground text-center">
                Nothing matches "{query}"
              </div>
            )}
            {results.map((r, i) => {
              const Icon = TYPE_ICON[r.type];
              const isActive = i === activeIndex;
              return (
                <button
                  key={`${r.type}-${r.id}`}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => go(r)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                    isActive ? "bg-secondary" : "hover:bg-secondary/60"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg bg-secondary/80 flex items-center justify-center ${TYPE_TINT[r.type]}`}>
                    <Icon className="w-4 h-4" strokeWidth={1.6} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{r.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{r.subtitle}</div>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 py-0.5 rounded bg-secondary border border-border">
                    {r.type}
                  </span>
                </button>
              );
            })}

            <button
              onMouseEnter={() => setActiveIndex(results.length)}
              onClick={() => {
                setOpen(false);
                navigate({ to: "/search" });
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-left border-t border-border ${
                activeIndex === results.length ? "bg-accent/10" : "hover:bg-accent/5"
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                <Sparkles className="w-4 h-4" strokeWidth={1.6} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">Ask Smart Crew AI</div>
                <div className="text-xs text-muted-foreground truncate">
                  {query ? `Run AI analysis for "${query}"` : "Open AI command center"}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
