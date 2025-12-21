import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface RiskMeterProps {
  value: number; // 0-100
  className?: string;
}

export function RiskMeter({ value, className }: RiskMeterProps) {
  const getRiskColor = () => {
    if (value <= 33) return "bg-wellness-low";
    if (value <= 66) return "bg-wellness-medium";
    return "bg-wellness-high";
  };

  const getRiskGradient = () => {
    if (value <= 33) return "from-wellness-low to-wellness-low/60";
    if (value <= 66) return "from-wellness-medium to-wellness-medium/60";
    return "from-wellness-high to-wellness-high/60";
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-muted-foreground">Risk Level</span>
        <span className="text-sm font-semibold text-foreground">{value}%</span>
      </div>
      
      <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
        {/* Background segments */}
        <div className="absolute inset-0 flex">
          <div className="flex-1 bg-wellness-low/20" />
          <div className="flex-1 bg-wellness-medium/20" />
          <div className="flex-1 bg-wellness-high/20" />
        </div>
        
        {/* Progress bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn(
            "absolute h-full rounded-full bg-gradient-to-r",
            getRiskGradient()
          )}
        />
        
        {/* Indicator dot */}
        <motion.div
          initial={{ left: "0%" }}
          animate={{ left: `${Math.min(value, 98)}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-background",
            getRiskColor(),
            "shadow-lg"
          )}
        />
      </div>
      
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
      </div>
    </div>
  );
}
