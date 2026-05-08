import { Users, AlertTriangle, CheckCircle } from "lucide-react";

export function PassengerImpactCard() {
  return (
    <div className="p-6 bg-card rounded-lg border border-border">
      <h3 className="mb-6 text-foreground">Passenger Impact</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Pax Affected</span>
          </div>
          <div className="font-semibold text-foreground" style={{ fontSize: '32px' }}>184</div>
          <div className="text-sm text-muted-foreground mt-1">passengers impacted</div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm text-muted-foreground">Rebooking Needed</span>
          </div>
          <div className="font-semibold text-destructive" style={{ fontSize: '32px' }}>12</div>
          <div className="text-sm text-muted-foreground mt-1">require assistance</div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-gold" />
            <span className="text-sm text-muted-foreground">VIPs on Board</span>
          </div>
          <div className="font-semibold text-gold" style={{ fontSize: '32px' }}>2</div>
          <div className="text-sm text-muted-foreground mt-1">priority handling</div>
        </div>
      </div>
    </div>
  );
}
