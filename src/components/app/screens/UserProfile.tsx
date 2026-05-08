import { GlassCard } from "../shared/GlassCard";
import { User, Mail, Briefcase, MapPin, Calendar, Shield, Edit } from "lucide-react";

export function UserProfile() {
  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User className="w-6 h-6" />
          <h1>User Profile</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity">
          <Edit className="w-4 h-4" />
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <GlassCard className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-accent" />
              </div>
              <h2 className="mb-1">John Anderson</h2>
              <p className="text-muted-foreground mb-4">Operations Manager</p>
              <div className="w-full space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>john.anderson@airline.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <span>Operations Department</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>New York, USA</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6">
            <h3 className="mb-6">Account Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">User ID</div>
                <div className="font-medium">USR-8847</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Role</div>
                <div className="font-medium">Operations Manager</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Department</div>
                <div className="font-medium">Operations</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Status</div>
                <div className="font-medium text-accent">Active</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Member Since</div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>January 15, 2024</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Last Login</div>
                <div className="font-medium">Today at 09:23 AM</div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-accent" />
              <h3>Permissions & Access</h3>
            </div>
            <div className="space-y-3">
              {[
                "Full Dashboard Access",
                "Crew Management",
                "AI Auto-Heal Configuration",
                "Conflict Resolution Approval",
                "Analytics & Reporting",
                "System Settings",
              ].map((permission, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                >
                  <span>{permission}</span>
                  <span className="px-2 py-0.5 rounded text-xs bg-accent/10 text-accent">
                    Enabled
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="mb-6">Activity Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-muted-foreground mb-1">Conflicts Resolved</div>
                <div className="font-semibold" style={{ fontSize: '28px' }}>47</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Crew Assignments</div>
                <div className="font-semibold" style={{ fontSize: '28px' }}>128</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">System Logins</div>
                <div className="font-semibold" style={{ fontSize: '28px' }}>342</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
