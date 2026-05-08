import { useNavigate } from "@tanstack/react-router";
import { GlassCard } from "../shared/GlassCard";
import { Settings as SettingsIcon, Zap, Bell, Shield, Globe, Database, ChevronRight, Key } from "lucide-react";

const settingsSections = [
  {
    category: "Operations",
    items: [
      {
        icon: Zap,
        title: "AI Auto-Heal",
        description: "Configure automatic conflict resolution thresholds and approval workflows",
        path: "/settings/auto-heal",
        badge: "Active",
      },
      {
        icon: Bell,
        title: "Notifications",
        description: "Manage real-time alerts, email preferences, and notification channels",
        path: "/notifications",
        badge: "12 Unread",
      },
    ],
  },
  {
    category: "Security",
    items: [
      {
        icon: Shield,
        title: "Security & Access Control",
        description: "Multi-factor authentication, role-based permissions, and audit logs",
        action: "Configure",
      },
      {
        icon: Key,
        title: "API Keys & Tokens",
        description: "Manage API authentication, OAuth tokens, and integration credentials",
        action: "Configure",
      },
    ],
  },
  {
    category: "System",
    items: [
      {
        icon: Globe,
        title: "Regional Settings",
        description: "Time zones, language preferences, date formats, and localization",
        action: "Configure",
      },
      {
        icon: Database,
        title: "Data & Integrations",
        description: "External systems, data sync, webhooks, and third-party connections",
        action: "Configure",
      },
    ],
  },
];

export function Settings() {
  const navigate = useNavigate();

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <SettingsIcon className="w-6 h-6" />
          <h1>Settings</h1>
        </div>
        <p className="text-muted-foreground">
          Configure system preferences and integrations
        </p>
      </div>

      <div className="space-y-8">
        {settingsSections.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h3 className="mb-4 text-sm uppercase tracking-wider text-muted-foreground">{category.category}</h3>
            <div className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="p-5 bg-card rounded-lg border border-border hover:border-accent/50 transition-all cursor-pointer group"
                  onClick={() => "path" in item && item.path && navigate({ to: item.path as never })}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-foreground">{item.title}</h4>
                          {"badge" in item && item.badge && (
                            <span className="px-2 py-0.5 rounded text-xs bg-accent/10 text-accent">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors text-sm font-medium group-hover:bg-accent group-hover:text-accent-foreground">
                        Configure
                      </button>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <GlassCard className="p-6">
        <h3 className="mb-6">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Version</div>
            <div className="font-medium">Smart Crew v3.2.1</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Last Updated</div>
            <div className="font-medium">April 15, 2026</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">License</div>
            <div className="font-medium">Enterprise</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Support</div>
            <div className="font-medium text-accent cursor-pointer" onClick={() => navigate({ to: "/help" })}>
              Contact Support →
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
