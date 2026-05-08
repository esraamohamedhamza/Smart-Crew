import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { GlassCard } from "../shared/GlassCard";
import { Users, Sparkles, TrendingUp } from "lucide-react";

const crewMembers = [
  {
    id: "CR-1001",
    name: "Captain Sarah Chen",
    role: "Senior Captain",
    aircraft: ["Boeing 787", "Boeing 777", "Airbus A350"],
    experience: "15 years",
    experienceYears: 15,
    flights: 4523,
    onTimeRate: 98,
    status: "Available",
  },
  {
    id: "CR-1002",
    name: "Captain Alex Rivera",
    role: "Captain",
    aircraft: ["Boeing 787", "Boeing 777"],
    experience: "12 years",
    experienceYears: 12,
    flights: 3891,
    onTimeRate: 96,
    status: "On Duty",
  },
  {
    id: "CR-1003",
    name: "Captain Mike Torres",
    role: "Captain",
    aircraft: ["Boeing 787", "Boeing 767"],
    experience: "10 years",
    experienceYears: 10,
    flights: 3245,
    onTimeRate: 97,
    status: "Rest Period",
  },
  {
    id: "CR-1004",
    name: "F/O Emily Watson",
    role: "First Officer",
    aircraft: ["Boeing 787", "Airbus A350"],
    experience: "8 years",
    experienceYears: 8,
    flights: 2876,
    onTimeRate: 95,
    status: "Available",
  },
];

/**
 * AI semantic filter — supports natural-language queries like:
 *   "Experience > 5 years"
 *   "Captain with Airbus A350 certification"
 *   "Boeing 787"
 *   "On-time > 96"
 */
function semanticFilter(list: typeof crewMembers, raw: string) {
  const q = raw.trim().toLowerCase();
  if (!q) return list;

  // Numeric comparisons: experience, on-time, flights
  const compRe = /(experience|exp|years|yrs|on[- ]?time|otp|flights?)\s*([<>]=?)\s*(\d+)/g;
  const comps = Array.from(q.matchAll(compRe));

  // Strip comparisons; remaining text is keyword search.
  const keywordPart = q.replace(compRe, "").replace(/\s{2,}/g, " ").trim();

  return list.filter((c) => {
    // Apply each numeric comparison
    for (const [, field, op, valStr] of comps) {
      const val = Number(valStr);
      let actual: number;
      if (field.startsWith("exp") || field.startsWith("year") || field.startsWith("yrs")) actual = c.experienceYears;
      else if (field.startsWith("on") || field === "otp") actual = c.onTimeRate;
      else actual = c.flights;
      if (op === ">"  && !(actual >  val)) return false;
      if (op === ">=" && !(actual >= val)) return false;
      if (op === "<"  && !(actual <  val)) return false;
      if (op === "<=" && !(actual <= val)) return false;
    }

    if (!keywordPart) return true;

    // Keyword search across name, role, certifications, status
    const haystack = [
      c.name,
      c.role,
      c.id,
      c.status,
      ...c.aircraft,
    ].join(" ").toLowerCase();

    // Tokenize keywords; every token must be present in haystack
    const tokens = keywordPart.split(/\s+/).filter((t) => t && !["with", "and", "the", "a", "an", "certification", "certified", "rated"].includes(t));
    return tokens.every((t) => haystack.includes(t));
  });
}

export function CrewProfiles() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => semanticFilter(crewMembers, query), [query]);

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1>Crew Profiles</h1>
          <p className="text-muted-foreground mt-1">
            Manage and view all crew members
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate({ to: "/crew/availability" })}
            className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Availability Grid
          </button>
        </div>
      </div>

      <GlassCard className="p-4">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-accent" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search crew with AI (e.g., 'Experience > 10 yrs' or 'Boeing 787')..."
            className="flex-1 bg-transparent outline-none text-sm"
          />
          {query && (
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {filtered.length} result{filtered.length === 1 ? "" : "s"}
            </span>
          )}
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((crew) => (
          <GlassCard
            key={crew.id}
            hover
            className="p-6 cursor-pointer"
            onClick={() => navigate({ to: `/crew/assign/${crew.id}` as never })}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-7 h-7 text-accent" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4>{crew.name}</h4>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    crew.status === "Available"
                      ? "bg-accent/10 text-accent"
                      : crew.status === "On Duty"
                      ? "bg-muted text-muted-foreground"
                      : "bg-destructive/10 text-destructive"
                  }`}>
                    {crew.status}
                  </span>
                </div>
                <div className="text-muted-foreground">{crew.role} • {crew.id}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Experience</div>
                <div className="font-medium">{crew.experience}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Total Flights</div>
                <div className="font-medium">{crew.flights.toLocaleString()}</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-muted-foreground mb-2">Certifications</div>
              <div className="flex flex-wrap gap-2">
                {crew.aircraft.map((aircraft) => (
                  <span
                    key={aircraft}
                    className="px-2 py-1 rounded text-xs bg-secondary"
                  >
                    {aircraft}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span className="text-sm text-muted-foreground">On-Time Rate</span>
                </div>
                <span className="font-medium text-accent">{crew.onTimeRate}%</span>
              </div>
            </div>
          </GlassCard>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full p-8 text-center text-muted-foreground text-sm">
            No crew matches "{query}". Try "Experience &gt; 10 yrs" or "Boeing 787".
          </div>
        )}
      </div>
    </div>
  );
}
