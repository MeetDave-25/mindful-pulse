import { cn } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

interface TrendData {
  day: string;
  sleep: number;
  focus: number;
  stress: number;
  energy: number;
}

const mockData: TrendData[] = [
  { day: "Mon", sleep: 75, focus: 80, stress: 30, energy: 70 },
  { day: "Tue", sleep: 65, focus: 70, stress: 45, energy: 60 },
  { day: "Wed", sleep: 70, focus: 65, stress: 50, energy: 55 },
  { day: "Thu", sleep: 60, focus: 55, stress: 60, energy: 50 },
  { day: "Fri", sleep: 55, focus: 50, stress: 65, energy: 45 },
  { day: "Sat", sleep: 70, focus: 60, stress: 50, energy: 60 },
  { day: "Sun", sleep: 80, focus: 75, stress: 35, energy: 75 },
];

interface TrendChartProps {
  className?: string;
  metric?: "sleep" | "focus" | "stress" | "energy" | "all";
}

const metricColors = {
  sleep: "hsl(220, 70%, 55%)",
  focus: "hsl(156, 50%, 45%)",
  stress: "hsl(15, 70%, 55%)",
  energy: "hsl(45, 80%, 55%)",
};

const metricLabels = {
  sleep: "Sleep Quality",
  focus: "Focus",
  stress: "Stress Level",
  energy: "Energy",
};

export function TrendChart({ className, metric = "all" }: TrendChartProps) {
  const metrics = metric === "all" 
    ? (["sleep", "focus", "stress", "energy"] as const)
    : [metric];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("glass-card p-6", className)}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-xl text-foreground">7-Day Trends</h3>
        <div className="flex gap-4">
          {metrics.map((m) => (
            <div key={m} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: metricColors[m] }}
              />
              <span className="text-xs text-muted-foreground">
                {metricLabels[m]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {metrics.map((m) => (
                <linearGradient key={m} id={`gradient-${m}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={metricColors[m]} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={metricColors[m]} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
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
                boxShadow: "var(--shadow-card)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            {metrics.map((m) => (
              <Area
                key={m}
                type="monotone"
                dataKey={m}
                stroke={metricColors[m]}
                strokeWidth={2}
                fill={`url(#gradient-${m})`}
                dot={{ fill: metricColors[m], strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2, stroke: "hsl(var(--background))" }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
