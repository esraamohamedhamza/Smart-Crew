import { X, AlertTriangle, Clock, Plane } from "lucide-react";

interface DelayedFlightsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const delayedFlights = [
  {
    id: "AA-1523",
    route: "JFK → LHR",
    scheduled: "08:00",
    actual: "08:45",
    delay: 45,
    reason: "Crew Shortage (Auto-Resolved)",
    status: "Resolved",
  },
  {
    id: "BA-2103",
    route: "LHR → DXB",
    scheduled: "15:45",
    actual: "16:30",
    delay: 45,
    reason: "Maintenance Delay",
    status: "Boarding",
  },
  {
    id: "EK-4412",
    route: "DXB → JFK",
    scheduled: "11:20",
    actual: "12:05",
    delay: 45,
    reason: "Weather Conditions",
    status: "In Flight",
  },
  {
    id: "QR-8821",
    route: "DOH → LAX",
    scheduled: "14:00",
    actual: "14:32",
    delay: 32,
    reason: "Air Traffic Control",
    status: "Departed",
  },
];

export function DelayedFlightsModal({ isOpen, onClose }: DelayedFlightsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h2>Delayed Flights</h2>
              <p className="text-sm text-muted-foreground">4 flights currently delayed</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          <div className="space-y-4">
            {delayedFlights.map((flight) => (
              <div
                key={flight.id}
                className="p-5 rounded-lg bg-secondary/30 border border-border hover:border-destructive/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <Plane className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{flight.id}</div>
                      <div className="text-muted-foreground">{flight.route}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 text-destructive">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-semibold">- {flight.delay} min</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Scheduled</span>
                    </div>
                    <div className="font-medium">{flight.scheduled}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-destructive" />
                      <span className="text-sm text-muted-foreground">Actual</span>
                    </div>
                    <div className="font-medium text-destructive">{flight.actual}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Reason</div>
                    <div className="font-medium text-sm">{flight.reason}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Status</div>
                    <div
                      className={`font-medium text-sm ${
                        flight.status === "Resolved" ? "text-accent" : "text-foreground"
                      }`}
                    >
                      {flight.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-accent/5 border border-accent/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <div className="font-medium text-accent mb-1">AI Auto-Heal Active</div>
                <p className="text-muted-foreground">
                  1 of 4 delayed flights was automatically resolved using crew standby pool. Average resolution time: 12 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity">
            Export Delay Report
          </button>
        </div>
      </div>
    </div>
  );
}
