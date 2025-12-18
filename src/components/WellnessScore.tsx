import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface WellnessScoreProps {
  score: number;
  label: string;
  icon: React.ReactNode;
  color: "low" | "medium" | "high" | "primary";
  className?: string;
}

const colorStyles = {
  low: "text-wellness-low bg-wellness-low/10 border-wellness-low/30",
  medium: "text-wellness-medium bg-wellness-medium/10 border-wellness-medium/30",
  high: "text-wellness-high bg-wellness-high/10 border-wellness-high/30",
  primary: "text-primary bg-primary/10 border-primary/30",
};

export function WellnessScore({ score, label, icon, color, className }: WellnessScoreProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        "glass-card p-5 rounded-2xl border",
        colorStyles[color],
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn("p-2 rounded-lg bg-current/10")}>
          {icon}
        </div>
        <span className="text-2xl font-bold">{score}%</span>
      </div>
      <p className="text-sm text-foreground font-medium">{label}</p>
    </motion.div>
  );
}
