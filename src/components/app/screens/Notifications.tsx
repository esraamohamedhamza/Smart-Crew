import { useNavigate } from "@tanstack/react-router";
import { GlassCard } from "../shared/GlassCard";
import { Bell, CheckCircle, AlertTriangle, Info, X } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "success",
    title: "Conflict Resolved",
    message: "CF-2401 was automatically resolved using AI Auto-Heal",
    time: "2 minutes ago",
    read: false,
    action: "/conflict/CF-2401/success",
  },
  {
    id: 2,
    type: "warning",
    title: "Crew Assignment Required",
    message: "Flight DL-8847 requires crew assignment review",
    time: "15 minutes ago",
    read: false,
    action: "/conflict/CF-2402/scenarios",
  },
  {
    id: 3,
    type: "info",
    title: "System Update",
    message: "Smart Crew v3.2.1 has been deployed successfully",
    time: "1 hour ago",
    read: true,
    action: "/settings",
  },
  {
    id: 4,
    type: "success",
    title: "Flight Departed",
    message: "AA-1523 departed on schedule from JFK",
    time: "2 hours ago",
    read: true,
    action: "/flight/AA-1523",
  },
  {
    id: 5,
    type: "info",
    title: "Maintenance Scheduled",
    message: "Aircraft BA-2103 scheduled for maintenance check",
    time: "4 hours ago",
    read: true,
    action: "/flight/BA-2103",
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case "success":
      return <CheckCircle className="w-5 h-5 text-accent" />;
    case "warning":
      return <AlertTriangle className="w-5 h-5 text-destructive" />;
    default:
      return <Info className="w-5 h-5 text-muted-foreground" />;
  }
};

export function Notifications() {
  const navigate = useNavigate();

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-6 h-6" />
            <h1>Notifications</h1>
          </div>
          <p className="text-muted-foreground">
            Stay updated with system alerts and updates
          </p>
        </div>
        <button className="px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
          Mark All as Read
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-5">
          <div className="text-muted-foreground mb-1">Unread</div>
          <div className="font-semibold" style={{ fontSize: '28px' }}>2</div>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="text-muted-foreground mb-1">Today</div>
          <div className="font-semibold" style={{ fontSize: '28px' }}>5</div>
        </GlassCard>
        <GlassCard className="p-5">
          <div className="text-muted-foreground mb-1">This Week</div>
          <div className="font-semibold" style={{ fontSize: '28px' }}>23</div>
        </GlassCard>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <GlassCard
            key={notification.id}
            hover
            className={`p-5 cursor-pointer ${
              !notification.read ? 'border-l-4 border-l-accent' : ''
            }`}
            onClick={() => navigate({ to: notification.action as never })}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="mt-1">{getIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4>{notification.title}</h4>
                    {!notification.read && (
                      <span className="w-2 h-2 rounded-full bg-accent" />
                    )}
                  </div>
                  <p className="text-muted-foreground mb-2">{notification.message}</p>
                  <span className="text-sm text-muted-foreground">{notification.time}</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
