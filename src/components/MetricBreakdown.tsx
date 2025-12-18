import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { format, subDays } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface MetricBreakdownProps {
  className?: string;
}

const weeklyData = [
  { day: "Mon", sleep: 72, focus: 68, stress: 45, energy: 65 },
  { day: "Tue", sleep: 68, focus: 62, stress: 52, energy: 58 },
  { day: "Wed", sleep: 65, focus: 58, stress: 60, energy: 52 },
  { day: "Thu", sleep: 70, focus: 65, stress: 48, energy: 60 },
  { day: "Fri", sleep: 58, focus: 52, stress: 65, energy: 48 },
  { day: "Sat", sleep: 78, focus: 72, stress: 35, energy: 70 },
  { day: "Sun", sleep: 82, focus: 78, stress: 30, energy: 75 },
];

const metrics = [
  { key: "sleep", label: "Sleep Quality", color: "hsl(220, 70%, 55%)" },
  { key: "focus", label: "Focus", color: "hsl(156, 50%, 45%)" },
  { key: "stress", label: "Stress", color: "hsl(15, 70%, 55%)" },
  { key: "energy", label: "Energy", color: "hsl(45, 80%, 55%)" },
];

export function MetricBreakdown({ className }: MetricBreakdownProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("glass-card p-6", className)}
    >
      <h3 className="font-display text-xl text-foreground mb-6">
        Weekly Metric Comparison
      </h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData} barGap={2}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              opacity={0.5}
            />
            <XAxis
              dataKey="day"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "12px",
              }}
            />
            {metrics.map((metric) => (
              <Bar
                key={metric.key}
                dataKey={metric.key}
                fill={metric.color}
                radius={[4, 4, 0, 0]}
                maxBarSize={20}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {metrics.map((metric) => (
          <div key={metric.key} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: metric.color }}
            />
            <span className="text-xs text-muted-foreground">{metric.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
