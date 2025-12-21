import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Lightbulb, TrendingDown, TrendingUp, AlertCircle, Sparkles } from "lucide-react";

interface InsightCardProps {
  type: "positive" | "warning" | "tip" | "trend";
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

const typeStyles = {
  positive: {
    icon: TrendingUp,
    bg: "bg-wellness-low/10",
    border: "border-wellness-low/30",
    iconBg: "bg-wellness-low/20",
    iconColor: "text-wellness-low",
  },
  warning: {
    icon: AlertCircle,
    bg: "bg-wellness-high/10",
    border: "border-wellness-high/30",
    iconBg: "bg-wellness-high/20",
    iconColor: "text-wellness-high",
  },
  tip: {
    icon: Lightbulb,
    bg: "bg-wellness-medium/10",
    border: "border-wellness-medium/30",
    iconBg: "bg-wellness-medium/20",
    iconColor: "text-wellness-medium",
  },
  trend: {
    icon: Sparkles,
    bg: "bg-primary/10",
    border: "border-primary/30",
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
  },
};

export function InsightCard({ type, title, description, className, delay = 0 }: InsightCardProps) {
  const styles = typeStyles[type];
  const Icon = styles.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "rounded-2xl border p-5",
        styles.bg,
        styles.border,
        className
      )}
    >
      <div className="flex gap-4">
        <div className={cn("p-2.5 rounded-xl h-fit", styles.iconBg)}>
          <Icon className={cn("w-5 h-5", styles.iconColor)} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
