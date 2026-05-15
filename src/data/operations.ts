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
  "SV-1523": {
    id: "SV-1523",
    aircraft: "Boeing 787-9 Dreamliner",
    route: "JED → LHR",
    origin: "JED",
    destination: "LHR",
    status: "In Flight",
    statusNote: "On Schedule",
    eta: "2h 15m",
    etaSubtitle: "Landing at 10:45 BST",
    altitudeFt: 38000,
    altitudeNote: "Cruising",
    speedMph: 542,
    captain: { name: "Captain Tariq Mansour", role: "Senior Type Rating Instructor", experience: "18 years", crewId: "CR-1001" },
    firstOfficer: { name: "F/O Khalid Al-Saud", role: "First Officer", experience: "6 years", crewId: "CR-1004" },
    altitudeProfile: mkProfile(38000),
  },
  "SV-8847": {
    id: "SV-8847",
    aircraft: "Airbus A350-900",
    route: "RUH → CDG",
    origin: "RUH",
    destination: "CDG",
    status: "On Schedule",
    statusNote: "Boarding now",
    eta: "6h 20m",
    etaSubtitle: "Landing at 14:05 CET",
    altitudeFt: 36000,
    altitudeNote: "Climbing",
    speedMph: 510,
    captain: { name: "Captain Faisal Al-Zahrani", role: "Line Captain", experience: "14 years", crewId: "CR-1002" },
    firstOfficer: { name: "F/O Yasser Qahtani", role: "First Officer", experience: "5 years", crewId: "CR-1005" },
    altitudeProfile: mkProfile(36000),
  },
  "EK-2103": {
    id: "EK-2103",
    aircraft: "Boeing 777-300ER",
    route: "DXB → JED",
    origin: "DXB",
    destination: "JED",
    status: "Delayed",
    statusNote: "-45 min delay",
    eta: "2h 10m",
    etaSubtitle: "Revised Arrival 23:15 AST",
    altitudeFt: 34000,
    altitudeNote: "Cruising",
    speedMph: 528,
    captain: { name: "Captain Sami Al-Harbi", role: "Line Captain", experience: "11 years", crewId: "CR-1003" },
    firstOfficer: { name: "F/O Khalid Al-Saud", role: "First Officer", experience: "6 years", crewId: "CR-1004" },
    altitudeProfile: mkProfile(34000),
  },
  "QR-7734": {
    id: "QR-7734",
    aircraft: "Boeing 787-10",
    route: "DOH → SFO",
    origin: "DOH",
    destination: "SFO",
    status: "On Schedule",
    statusNote: "On Schedule",
    eta: "15h 30m",
    etaSubtitle: "Landing at 09:50 PST",
    altitudeFt: 39000,
    altitudeNote: "Cruising",
    speedMph: 555,
    captain: { name: "Captain Tariq Mansour", role: "Senior Type Rating Instructor", experience: "18 years", crewId: "CR-1001" },
    firstOfficer: { name: "F/O Sami Al-Harbi", role: "First Officer", experience: "11 years", crewId: "CR-1003" },
    altitudeProfile: mkProfile(39000),
  },
  "SV-2104": {
    id: "SV-2104",
    aircraft: "Airbus A321neo",
    route: "Standby Pool",
    origin: "RUH",
    destination: "—",
    status: "On Schedule",
    statusNote: "Standby",
    eta: "On call",
    etaSubtitle: "Available immediately",
    altitudeFt: 0,
    altitudeNote: "Ground",
    speedMph: 0,
    captain: { name: "Captain Faisal Al-Zahrani", role: "Line Captain", experience: "14 years", crewId: "CR-1002" },
    firstOfficer: { name: "F/O Yasser Qahtani", role: "First Officer", experience: "5 years", crewId: "CR-1005" },
    altitudeProfile: mkProfile(0),
  },
  "SV-6612": {
    id: "SV-6612",
    aircraft: "Boeing 777-300ER",
    route: "Hangar 3 (JED)",
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
  const seed = (id ?? "SV-0000").split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const peak = 32000 + (seed % 8) * 1000;
  return {
    id: id ?? "SV-0000",
    aircraft: "Boeing 787-9 Dreamliner",
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
    captain: { name: "Captain Tariq Mansour", role: "Senior Pilot", experience: "18 years", crewId: "CR-1001" },
    firstOfficer: { name: "F/O Sami Al-Harbi", role: "Pilot", experience: "11 years", crewId: "CR-1003" },
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
  "SV-1523": [
    { time: "08:45", event: "In Flight",             description: "Aircraft reached cruising altitude 38,000 ft",                  status: "success" },
    { time: "08:30", event: "Takeoff",               description: "Departed JED Runway 34R",                                       status: "success" },
    { time: "08:15", event: "Crew Assignment Updated",      description: "AI Auto-Heal resolved crew shortage with backup crew from pool", status: "warning" },
    { time: "08:00", event: "Boarding Complete",            description: "All 287 passengers boarded, ready for departure",               status: "success" },
    { time: "07:45", event: "Crew Shortage Detected",       description: "Original first officer unavailable due to flight duty rest violation", status: "warning" },
    { time: "07:30", event: "Aircraft Ready",               description: "Pre-flight checks and smart dispatch clearance completed",      status: "success" },
  ],
  "SV-8847": [
    { time: "10:25", event: "Boarding Started",             description: "Group A passengers now boarding via Gate 24",                  status: "success" },
    { time: "10:05", event: "Crew Briefed",                  description: "Captain Al-Zahrani completed pre-flight operations briefing",   status: "success" },
    { time: "09:40", event: "Catering Loaded",              description: "Long-haul catering manifest confirmed for 322 pax",              status: "success" },
    { time: "09:00", event: "Aircraft Ready",               description: "A350-900 cleared for departure prep at RUH Terminal 4",         status: "success" },
  ],
  "EK-2103": [
    { time: "16:30", event: "Departure Slot Reassigned",    description: "ATC issued new slot after 45-minute ground hold at DXB",         status: "warning" },
    { time: "16:00", event: "Maintenance Sign-off",         description: "Engine #2 sensor swap completed and certified by engineering team", status: "success" },
    { time: "15:45", event: "Original Departure Window",    description: "Held due to mandatory maintenance check on engine #2",          status: "warning" },
    { time: "15:00", event: "Aircraft Inspection",          description: "Routine inspection escalated after telemetry sensor anomaly",    status: "warning" },
  ],
};

export function getFlightHistory(id: string | undefined): HistoryEvent[] {
  return (id && FLIGHT_HISTORY[id]) || FLIGHT_HISTORY["SV-1523"];
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
    name: "Captain Tariq Mansour",
    role: "Senior Captain",
    experience: "18 years",
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
    name: "Captain Faisal Al-Zahrani",
    role: "Captain",
    experience: "14 years",
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
    name: "Captain Sami Al-Harbi",
    role: "Captain",
    experience: "11 years",
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
    name: "F/O Khalid Al-Saud",
    role: "First Officer",
    experience: "6 years",
    matchScore: 89,
    onTimeRate:
