import { TrendChart } from "@/components/TrendChart";
import { InsightCard } from "@/components/InsightCard";
import { CalendarHeatmap } from "@/components/CalendarHeatmap";
import { WeeklyHeatmap } from "@/components/WeeklyHeatmap";
import { MetricBreakdown } from "@/components/MetricBreakdown";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

const radarData = [
  { subject: "Sleep", A: 75, fullMark: 100 },
  { subject: "Focus", A: 68, fullMark: 100 },
  { subject: "Energy", A: 62, fullMark: 100 },
  { subject: "Mood", A: 70, fullMark: 100 },
  { subject: "Stress", A: 55, fullMark: 100 },
];

const behaviorData = [
  { label: "Check-ins Completed", value: "12/14", percentage: 86 },
  { label: "Avg Response Time", value: "< 2 min", percentage: 92 },
  { label: "Streak Days", value: "7 days", percentage: 100 },
  { label: "Skip Rate", value: "14%", percentage: 14, inverted: true },
];

export function TrendsView() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-6"
      >
        <h1 className="font-display text-3xl md:text-4xl text-foreground mb-3">
          Your Wellness Trends
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Patterns over time help us understand your mental wellness journey.
        </p>
      </motion.div>

      {/* Calendar Heatmap - NEW */}
      <CalendarHeatmap />

      {/* 12-Week GitHub-style Heatmap - NEW */}
      <WeeklyHeatmap weeks={12} />

      {/* Main Trend Chart */}
      <TrendChart metric="all" />

      {/* Metric Breakdown Bar Chart - NEW */}
      <MetricBreakdown />

      {/* Radar + Behavioral in Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Radar Chart - Overall Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <h3 className="font-display text-xl text-foreground mb-6">
            Wellness Balance
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                />
                <Radar
                  name="Wellness"
                  dataKey="A"
                  stroke="hsl(156, 50%, 45%)"
                  fill="hsl(156, 50%, 45%)"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Behavioral Signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <h3 className="font-display text-xl text-foreground mb-6">
            Behavioral Signals
          </h3>
          <div className="space-y-4">
            {behaviorData.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-secondary/30 border border-border/30"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="font-semibold text-foreground">{item.value}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                    className={cn(
                      "h-full rounded-full",
                      item.inverted
                        ? item.percentage > 20
                          ? "bg-wellness-high"
                          : "bg-wellness-low"
                        : item.percentage > 70
                        ? "bg-wellness-low"
                        : item.percentage > 40
                        ? "bg-wellness-medium"
                        : "bg-wellness-high"
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Pattern Insights */}
      <div className="space-y-4">
        <h2 className="font-display text-xl text-foreground">Pattern Analysis</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <InsightCard
            type="trend"
            title="Multi-Day Pattern"
            description="Sleep quality has declined for 3 consecutive days, which often precedes focus issues."
            delay={0.1}
          />
          <InsightCard
            type="positive"
            title="Consistency Detected"
            description="Your regular check-in habit helps us provide more accurate wellness predictions."
            delay={0.2}
          />
        </div>
      </div>
    </div>
  );
}
