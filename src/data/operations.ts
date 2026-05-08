/**
 * Centralised mock data for flights, crew, conflicts, and scenarios.
 * Every detail screen reads from these so each ID renders unique values.
 */

export type FlightRecord = {
  id: string;
  aircraft: string;
  route: string;
  origin: string;
  destination: string;
  status: "In Flight" | "Boarding" | "On Schedule" | "Delayed" | "Departed" | "Maintenance";
  statusNote: string;
  eta: string;
  etaSubtitle: string;
  altitudeFt: number;
  altitudeNote: string;
  speedMph: number;
  captain: { name: string; role: string; experience: string; crewId: string };
  firstOfficer: { name: string; role: string; experience: string; crewId: string };
  altitudeProfile: { time: string; altitude: number }[];
};

const mkProfile = (peak: number) => [
  { time: "08:00", altitude: 0 },
  { time: "08:15", altitude: Math.round(peak * 0.4) },
  { time: "08:30", altitude: Math.round(peak * 0.85) },
  { time: "08:45", altitude: peak },
  { time: "09:00", altitude: peak },
  { time: "09:15", altitude: peak },
];

export const FLIGHTS: Record<string, FlightRecord> = {
  "AA-1523": {
    id: "AA-1523",
    aircraft: "Boeing 787-9",
    route: "JFK → LHR",
    origin: "JFK",
    destination: "LHR",
    status: "In Flight",
    statusNote: "On Schedule",
    eta: "2h 15m",
    etaSubtitle: "Landing at 10:45",
    altitudeFt: 38000,
    altitudeNote: "Cruising",
    speedMph: 542,
    captain: { name: "Captain Sarah Chen", role: "Senior Pilot", experience: "15 years", crewId: "CR-1001" },
    firstOfficer: { name: "F/O Mike Torres", role: "Pilot", experience: "8 years", crewId: "CR-1003" },
    altitudeProfile: mkProfile(38000),
  },
  "DL-8847": {
    id: "DL-8847",
    aircraft: "Airbus A350-900",
    route: "LAX → NRT",
    origin: "LAX",
    destination: "NRT",
    status: "On Schedule",
    statusNote: "Boarding now",
    eta: "11h 20m",
    etaSubtitle: "Landing at 14:05 JST",
    altitudeFt: 36000,
    altitudeNote: "Climbing",
    speedMph: 510,
    captain: { name: "Captain Alex Rivera", role: "Captain", experience: "12 years", crewId: "CR-1002" },
    firstOfficer: { name: "F/O Emily Watson", role: "First Officer", experience: "8 years", crewId: "CR-1004" },
    altitudeProfile: mkProfile(36000),
  },
  "BA-2103": {
    id: "BA-2103",
    aircraft: "Boeing 777-300ER",
    route: "LHR → DXB",
    origin: "LHR",
    destination: "DXB",
    status: "Delayed",
    statusNote: "-45 min delay",
    eta: "6h 50m",
    etaSubtitle: "Landing at 23:15 GST",
    altitudeFt: 34000,
    altitudeNote: "Cruising",
    speedMph: 528,
    captain: { name: "Captain Mike Torres", role: "Captain", experience: "10 years", crewId: "CR-1003" },
    firstOfficer: { name: "F/O Emily Watson", role: "First Officer", experience: "8 years", crewId: "CR-1004" },
    altitudeProfile: mkProfile(34000),
  },
  "EK-7734": {
    id: "EK-7734",
    aircraft: "Boeing 787-10",
    route: "DXB → SFO",
    origin: "DXB",
    destination: "SFO",
    status: "On Schedule",
    statusNote: "On Schedule",
    eta: "15h 30m",
    etaSubtitle: "Landing at 09:50 PST",
    altitudeFt: 39000,
    altitudeNote: "Cruising",
    speedMph: 555,
    captain: { name: "Captain Sarah Chen", role: "Senior Pilot", experience: "15 years", crewId: "CR-1001" },
    firstOfficer: { name: "F/O Mike Torres", role: "Pilot", experience: "8 years", crewId: "CR-1003" },
    altitudeProfile: mkProfile(39000),
  },
  "SV-1523": {
    id: "SV-1523",
    aircraft: "Boeing 787-9",
    route: "JED → LHR",
    origin: "JED",
    destination: "LHR",
    status: "In Flight",
    statusNote: "On Schedule",
    eta: "2h 15m",
    etaSubtitle: "Landing at 10:45",
    altitudeFt: 38000,
    altitudeNote: "Cruising",
    speedMph: 542,
    captain: { name: "Captain Sarah Chen", role: "Senior Pilot", experience: "15 years", crewId: "CR-1001" },
    firstOfficer: { name: "F/O Mike Torres", role: "Pilot", experience: "8 years", crewId: "CR-1003" },
    altitudeProfile: mkProfile(38000),
  },
  "SV-2103": {
    id: "SV-2103",
    aircraft: "Airbus A321neo",
    route: "Backup pool",
    origin: "RUH",
    destination: "—",
    status: "On Schedule",
    statusNote: "Standby",
    eta: "On call",
    etaSubtitle: "Available immediately",
    altitudeFt: 0,
    altitudeNote: "Ground",
    speedMph: 0,
    captain: { name: "Captain Alex Rivera", role: "Captain", experience: "12 years", crewId: "CR-1002" },
    firstOfficer: { name: "F/O Emily Watson", role: "First Officer", experience: "8 years", crewId: "CR-1004" },
    altitudeProfile: mkProfile(0),
  },
  "SV-6612": {
    id: "SV-6612",
    aircraft: "Boeing 777-300ER",
    route: "Hangar 3",
    origin: "JED",
    destination: "—",
    status: "Maintenance",
    statusNote: "Scheduled service",
    eta: "Scheduled 6h",
    etaSubtitle: "Returning to service tomorrow",
    altitudeFt: 0,
    altitudeNote: "Hangar",
    speedMph: 0,
    captain: { name: "—", role: "Awaiting assignment", experience: "—", crewId: "—" },
    firstOfficer: { name: "—", role: "Awaiting assignment", experience: "—", crewId: "—" },
    altitudeProfile: mkProfile(0),
  },
};

export function getFlight(id: string | undefined): FlightRecord {
  if (id && FLIGHTS[id]) return FLIGHTS[id];
  // Fallback to a deterministic generated record so unknown IDs still show distinct data.
  const seed = (id ?? "AA-0000").split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const peak = 32000 + (seed % 8) * 1000;
  return {
    id: id ?? "AA-0000",
    aircraft: "Boeing 787-9",
    route: "JED → LHR",
    origin: "JED",
    destination: "LHR",
    status: "In Flight",
    statusNote: "On Schedule",
    eta: `${(seed % 5) + 2}h ${(seed % 50) + 10}m`,
    etaSubtitle: "Real-time ETA",
    altitudeFt: peak,
    altitudeNote: "Cruising",
    speedMph: 500 + (seed % 60),
    captain: { name: "Captain Sarah Chen", role: "Senior Pilot", experience: "15 years", crewId: "CR-1001" },
    firstOfficer: { name: "F/O Mike Torres", role: "Pilot", experience: "8 years", crewId: "CR-1003" },
    altitudeProfile: mkProfile(peak),
  };
}

// ---- Flight history per ID (each unique) ----

export type HistoryEvent = {
  time: string;
  event: string;
  description: string;
  status: "success" | "warning";
};

export const FLIGHT_HISTORY: Record<string, HistoryEvent[]> = {
  "AA-1523": [
    { time: "08:45", event: "In Flight",                    description: "Aircraft reached cruising altitude 38,000 ft",                  status: "success" },
    { time: "08:30", event: "Takeoff",                      description: "Departed JFK Runway 22L",                                       status: "success" },
    { time: "08:15", event: "Crew Assignment Updated",      description: "AI Auto-Heal resolved crew shortage with backup crew",          status: "warning" },
    { time: "08:00", event: "Boarding Complete",            description: "All 287 passengers boarded, ready for departure",               status: "success" },
    { time: "07:45", event: "Crew Shortage Detected",       description: "Original first officer unavailable due to rest violation",      status: "warning" },
    { time: "07:30", event: "Aircraft Ready",               description: "Pre-flight checks completed",                                   status: "success" },
  ],
  "DL-8847": [
    { time: "10:25", event: "Boarding Started",             description: "Group A passengers now boarding via Gate B14",                  status: "success" },
    { time: "10:05", event: "Crew Briefed",                 description: "Captain Rivera completed pre-flight briefing",                  status: "success" },
    { time: "09:40", event: "Catering Loaded",              description: "Long-haul catering manifest confirmed for 322 pax",             status: "success" },
    { time: "09:00", event: "Aircraft Ready",               description: "A350-900 N747DL cleared for departure prep",                    status: "success" },
  ],
  "BA-2103": [
    { time: "16:30", event: "Departure Slot Reassigned",    description: "ATC issued new slot after 45-minute hold",                      status: "warning" },
    { time: "16:00", event: "Maintenance Sign-off",         description: "Engine #2 sensor swap completed and certified",                 status: "success" },
    { time: "15:45", event: "Original Departure Window",    description: "Held due to maintenance check on engine #2",                    status: "warning" },
    { time: "15:00", event: "Aircraft Inspection",          description: "Routine inspection escalated after sensor anomaly",             status: "warning" },
  ],
  "EK-7734": [
    { time: "18:20", event: "Pushback",                     description: "Departed gate on schedule with full crew complement",           status: "success" },
    { time: "17:50", event: "Boarding Complete",            description: "All 340 passengers boarded",                                    status: "success" },
    { time: "17:00", event: "Aircraft Ready",               description: "Boeing 787-10 cleared for ultra-long-haul service",             status: "success" },
  ],
};

export function getFlightHistory(id: string | undefined): HistoryEvent[] {
  return (id && FLIGHT_HISTORY[id]) || FLIGHT_HISTORY["AA-1523"];
}

// ---- Crew profiles per ID ----

export type CrewRecord = {
  id: string;
  name: string;
  role: string;
  experience: string;
  matchScore: number;
  onTimeRate: number;
  status: "Available" | "On Duty" | "Rest Period";
  certifications: string[];
  flights: number;
  baseAirport: string;
  restCompliantHours: number;
};

export const CREW: Record<string, CrewRecord> = {
  "CR-1001": {
    id: "CR-1001",
    name: "Captain Sarah Chen",
    role: "Senior Captain",
    experience: "15 years",
    matchScore: 98,
    onTimeRate: 98,
    status: "Available",
    certifications: ["Boeing 787-9", "Boeing 777-300ER", "Airbus A350-900"],
    flights: 4523,
    baseAirport: "JED",
    restCompliantHours: 14,
  },
  "CR-1002": {
    id: "CR-1002",
    name: "Captain Alex Rivera",
    role: "Captain",
    experience: "12 years",
    matchScore: 94,
    onTimeRate: 96,
    status: "On Duty",
    certifications: ["Boeing 787-9", "Boeing 777-300ER", "Airbus A330-300", "Airbus A321neo"],
    flights: 3891,
    baseAirport: "RUH",
    restCompliantHours: 18,
  },
  "CR-1003": {
    id: "CR-1003",
    name: "Captain Mike Torres",
    role: "Captain",
    experience: "10 years",
    matchScore: 91,
    onTimeRate: 97,
    status: "Rest Period",
    certifications: ["Boeing 787-9", "Boeing 767-300"],
    flights: 3245,
    baseAirport: "DMM",
    restCompliantHours: 9,
  },
  "CR-1004": {
    id: "CR-1004",
    name: "F/O Emily Watson",
    role: "First Officer",
    experience: "8 years",
    matchScore: 89,
    onTimeRate: 95,
    status: "Available",
    certifications: ["Boeing 787-9", "Airbus A350-900"],
    flights: 2876,
    baseAirport: "JED",
    restCompliantHours: 21,
  },
};

export function getCrew(id: string | undefined): CrewRecord {
  return (id && CREW[id]) || CREW["CR-1001"];
}

// ---- Conflicts and scenarios ----

export type ConflictRecord = {
  id: string;
  type: string;
  flight: string;
  severity: "High" | "Medium" | "Low";
  status: "Auto-Resolved" | "Pending" | "Review Required";
  detectedAt: string;
};

export const CONFLICTS: Record<string, ConflictRecord> = {
  "CF-2401": { id: "CF-2401", type: "Crew Shortage",    flight: "AA-1523", severity: "High",   status: "Auto-Resolved",    detectedAt: "2 min ago" },
  "CF-2402": { id: "CF-2402", type: "Schedule Overlap", flight: "DL-8847", severity: "Medium", status: "Pending",          detectedAt: "15 min ago" },
  "CF-2403": { id: "CF-2403", type: "Maintenance Delay", flight: "BA-2103", severity: "Low",   status: "Review Required",  detectedAt: "1 h ago" },
};

export function getConflict(id: string | undefined): ConflictRecord {
  return (id && CONFLICTS[id]) || CONFLICTS["CF-2401"];
}

export type ScenarioRecord = {
  id: string;
  conflictId: string;
  name: string;
  description: string;
  cost: number; // negative = loss
  delayMinutes: number; // positive = delay (loss)
  successRate: number;
  recommended: boolean;
  steps: string[];
};

export const SCENARIOS: Record<string, ScenarioRecord> = {
  "SC-1": {
    id: "SC-1", conflictId: "CF-2401",
    name: "Backup Crew Assignment",
    description: "Assign certified backup crew from standby pool",
    cost: -2400, delayMinutes: 15, successRate: 94, recommended: true,
    steps: [
      "Contact standby crew member Captain Alex Rivera",
      "Verify certification and rest period compliance",
      "Update flight manifest and crew assignment",
      "Notify ground operations and gate staff",
      "Brief crew on flight details and passenger count",
    ],
  },
  "SC-2": {
    id: "SC-2", conflictId: "CF-2401",
    name: "Extended Rest Period",
    description: "Delay flight by 30 min to allow crew rest compliance",
    cost: -4800, delayMinutes: 30, successRate: 89, recommended: false,
    steps: [
      "Notify ground operations of new departure window",
      "Coordinate with ATC for revised slot",
      "Update passenger boarding announcements",
      "Reissue crew duty timing",
    ],
  },
  "SC-3": {
    id: "SC-3", conflictId: "CF-2401",
    name: "Flight Cancellation",
    description: "Cancel and reschedule with passenger rebooking",
    cost: -18500, delayMinutes: 240, successRate: 100, recommended: false,
    steps: [
      "Initiate cancellation workflow in OPS console",
      "Trigger rebooking engine for all 287 passengers",
      "Issue compensation per regulation EU261/Saudi GACA",
      "Coordinate hotel & ground transport for affected pax",
    ],
  },
};

export function getScenario(id: string | undefined): ScenarioRecord {
  return (id && SCENARIOS[id]) || SCENARIOS["SC-1"];
}
