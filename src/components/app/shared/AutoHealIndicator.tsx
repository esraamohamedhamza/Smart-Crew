import { useState } from "react";
import { Zap } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "@tanstack/react-router";

export function AutoHealIndicator() {
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate({ to: "/settings/auto-heal" })}
      className="relative px-4 py-2 rounded-lg transition-all group bg-card/40 backdrop-blur-md border border-white/20 hover:border-accent/50 shadow-lg"
      style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
      }}
    >
      {isActive && (
        <>
          <motion.div
            className="absolute inset-0 rounded-lg bg-accent"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}
      <div className="flex items-center gap-2 relative z-10">
        <Zap className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-muted-foreground'}`} strokeWidth={2} />
        <span className={`text-sm font-medium ${isActive ? 'text-accent' : 'text-muted-foreground'}`}>
          Auto-Heal
        </span>
        {isActive && (
          <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        )}
      </div>
      <span className="absolute right-0 top-12 px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: '#1E293B', color: '#FFFFFF', border: '1px solid #2D3A4F' }}>
        Configure Auto-Heal
      </span>
    </button>
  );
}
