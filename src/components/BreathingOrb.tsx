import { cn } from "@/lib/utils";

interface BreathingOrbProps {
  riskLevel: "low" | "medium" | "high";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const riskColors = {
  low: {
    bg: "bg-wellness-low",
    glow: "shadow-[0_0_60px_hsl(156_50%_45%/0.4)]",
    ring: "bg-wellness-low/30",
    label: "Balanced",
    gradient: "from-wellness-low/80 to-wellness-low/40",
  },
  medium: {
    bg: "bg-wellness-medium",
    glow: "shadow-[0_0_60px_hsl(45_80%_55%/0.4)]",
    ring: "bg-wellness-medium/30",
    label: "Attention Needed",
    gradient: "from-wellness-medium/80 to-wellness-medium/40",
  },
  high: {
    bg: "bg-wellness-high",
    glow: "shadow-[0_0_60px_hsl(15_70%_55%/0.4)]",
    ring: "bg-wellness-high/30",
    label: "Take a Breath",
    gradient: "from-wellness-high/80 to-wellness-high/40",
  },
};

const sizes = {
  sm: { container: "w-24 h-24", orb: "w-16 h-16", ring: "w-20 h-20" },
  md: { container: "w-40 h-40", orb: "w-28 h-28", ring: "w-36 h-36" },
  lg: { container: "w-56 h-56", orb: "w-40 h-40", ring: "w-52 h-52" },
};

export function BreathingOrb({ riskLevel, size = "md", className }: BreathingOrbProps) {
  const colors = riskColors[riskLevel];
  const sizeClasses = sizes[size];

  return (
    <div className={cn("relative flex items-center justify-center", sizeClasses.container, className)}>
      {/* Outer ripple rings */}
      <div
        className={cn(
          "absolute rounded-full",
          colors.ring,
          sizeClasses.ring,
          "animate-pulse-ring opacity-30"
        )}
      />
      <div
        className={cn(
          "absolute rounded-full",
          colors.ring,
          sizeClasses.ring,
          "animate-pulse-ring opacity-20 delay-500"
        )}
        style={{ animationDelay: "0.5s" }}
      />

      {/* Main breathing orb */}
      <div
        className={cn(
          "rounded-full animate-breathe transition-all duration-1000",
          `bg-gradient-to-br ${colors.gradient}`,
          colors.glow,
          sizeClasses.orb,
          "flex items-center justify-center"
        )}
      >
        {/* Inner glow */}
        <div
          className={cn(
            "rounded-full w-2/3 h-2/3",
            "bg-gradient-to-br from-white/30 to-transparent",
            "animate-breathe-slow"
          )}
        />
      </div>

      {/* Status label */}
      <div className="absolute -bottom-8 text-center">
        <span className="text-sm font-medium text-muted-foreground">
          {colors.label}
        </span>
      </div>
    </div>
  );
}
