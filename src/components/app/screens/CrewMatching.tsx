import { useNavigate } from "@tanstack/react-router";
import { GlassCard } from "../shared/GlassCard";
import { Sparkles, Users, CheckCircle, Clock, TrendingUp } from "lucide-react";

const matchResults = [
  {
    id: "CR-1001",
    name: "Captain Sarah Chen",
    aircraft: "Boeing 787-9",
    matchScore: 98,
    availability: "Available Now",
    certifications: ["Boeing 787-9", "Boeing 777-300ER", "Airbus A350-900"],
    experience: "15 years",
  },
  {
    id: "CR-1002",
    name: "Captain Alex Rivera",
    aircraft: "Boeing 787-9",
    matchScore: 94,
    availability: "Available in 2h",
    certifications: ["Boeing 787-9", "Boeing 777-300ER", "Airbus A330-300", "Airbus A321neo"],
    experience: "12 years",
  },
  {
    id: "CR-1003",
    name: "Captain Mike Torres",
    aircraft: "Boeing 787-9",
    matchScore: 91,
    availability: "Available Tomorrow",
    certifications: ["Boeing 787-9", "Boeing 767-300"],
    experience: "10 years",
  },
];

export function CrewMatching() {
  const navigate = useNavigate();

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-accent" />
            <h1>Smart Crew Matching</h1>
          </div>
          <p className="text-muted-foreground">
            AI-powered crew assignment for Flight AA-1523
          </p>
        </div>
        <button
          onClick={() => navigate({ to: "/crew/profiles" })}
          className="px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
        >
          View All Crew
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-accent" />
            <span className="text-muted-foreground">Matches Found</span>
          </div>
          <div className="font-semibold" style={{ fontSize: '28px' }}>3</div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            <span className="text-muted-foreground">Avg Match Score</span>
          </div>
          <div className="font-semibold" style={{ fontSize: '28px' }}>94%</div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-accent" />
            <span className="text-muted-foreground">Available Now</span>
          </div>
          <div className="font-semibold" style={{ fontSize: '28px' }}>1</div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-accent" />
            <span className="text-muted-foreground">Avg Response</span>
          </div>
          <div className="font-semibold" style={{ fontSize: '28px' }}>3m</div>
        </GlassCard>
      </div>

      <div className="space-y-4">
        <h3>Best Matches (Ranked by AI)</h3>
        {matchResults.map((crew, i) => (
          <GlassCard
            key={crew.id}
            hover
            className={`p-6 cursor-pointer ${
              i === 0 ? 'border-2 border-accent/50' : ''
            }`}
            onClick={() => navigate({ to: `/crew/assign/${crew.id}` as never })}
          >
            {i === 0 && (
              <div className="flex items-center gap-2 mb-4 px-3 py-1.5 bg-accent/10 rounded-lg w-fit">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-accent">Best Match</span>
              </div>
            )}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4>{crew.name}</h4>
                    <span className="px-2 py-0.5 rounded text-xs bg-accent/10 text-accent">
                      {crew.matchScore}% Match
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">ID</div>
                      <div className="font-medium">{crew.id}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Experience</div>
                      <div className="font-medium">{crew.experience}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-muted-foreground">Certified Aircraft</div>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {crew.certifications.slice(0, 2).map((c) => (
                          <span key={c} className="px-2 py-0.5 rounded text-xs bg-secondary text-foreground border border-border">
                            {c}
                          </span>
                        ))}
                        {crew.certifications.length > 2 && (
                          <span className="px-2 py-0.5 rounded text-xs bg-accent/10 text-accent border border-accent/20">
                            +{crew.certifications.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Availability</div>
                      <div className={`font-medium ${
                        crew.availability === "Available Now" ? "text-accent" : "text-muted-foreground"
                      }`}>
                        {crew.availability}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate({ to: `/crew/assign/${crew.id}` as never });
                }}
                className={`px-6 py-2.5 rounded-lg transition-opacity whitespace-nowrap ${
                  i === 0
                    ? 'bg-accent text-accent-foreground hover:opacity-90'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                Assign to Flight
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate({ to: "/crew/availability" })}
          className="flex-1 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          View Availability Grid
        </button>
        <button
          onClick={() => navigate({ to: "/" })}
          className="px-6 py-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
