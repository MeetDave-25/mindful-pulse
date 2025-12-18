import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { format, subDays, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";

interface WeeklyHeatmapProps {
  weeks?: number;
  className?: string;
}

// Generate mock data
const generateMockData = () => {
  const data: Record<string, number> = {};
  const today = new Date();
  
  for (let i = 0; i < 84; i++) { // 12 weeks
    const date = subDays(today, i);
    const dateStr = format(date, "yyyy-MM-dd");
    data[dateStr] = Math.floor(Math.random() * 40) + 50;
    if (Math.random() > 0.85) {
      data[dateStr] = Math.floor(Math.random() * 30) + 20;
    }
  }
  return data;
};

const mockData = generateMockData();

const getColorForScore = (score: number | undefined) => {
  if (score === undefined) return "bg-secondary/20";
  if (score >= 80) return "bg-wellness-low";
  if (score >= 60) return "bg-wellness-low/50";
  if (score >= 40) return "bg-wellness-medium";
  return "bg-wellness-high/70";
};

export function WeeklyHeatmap({ weeks = 12, className }: WeeklyHeatmapProps) {
  const today = new Date();
  const weekStart = startOfWeek(today);
  
  // Generate week data
  const weekData = [];
  for (let w = weeks - 1; w >= 0; w--) {
    const weekStartDate = subDays(weekStart, w * 7);
    const weekEndDate = endOfWeek(weekStartDate);
    const days = eachDayOfInterval({ start: weekStartDate, end: weekEndDate });
    weekData.push({
      week: format(weekStartDate, "MMM d"),
      days: days.map(d => ({
        date: format(d, "yyyy-MM-dd"),
        dayName: format(d, "EEE"),
        score: mockData[format(d, "yyyy-MM-dd")]
      }))
    });
  }

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("glass-card p-6", className)}
    >
      <h3 className="font-display text-xl text-foreground mb-6">
        12-Week Overview
      </h3>

      <div className="flex gap-2">
        {/* Day labels */}
        <div className="flex flex-col gap-1 pt-6">
          {dayLabels.map((day, i) => (
            <div
              key={day}
              className={cn(
                "h-4 text-[10px] text-muted-foreground flex items-center",
                i % 2 === 1 && "opacity-0" // Show every other label
              )}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {weekData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {/* Week label */}
                <div className="h-5 text-[10px] text-muted-foreground text-center truncate">
                  {weekIndex % 2 === 0 ? week.week : ""}
                </div>
                {/* Days */}
                {week.days.map((day) => (
                  <motion.div
                    key={day.date}
                    whileHover={{ scale: 1.2 }}
                    className={cn(
                      "w-4 h-4 rounded-sm cursor-pointer transition-all",
                      getColorForScore(day.score)
                    )}
                    title={`${day.date}: ${day.score ?? "No data"}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-secondary/20" />
          <div className="w-3 h-3 rounded-sm bg-wellness-low/50" />
          <div className="w-3 h-3 rounded-sm bg-wellness-low" />
        </div>
        <span>More Wellness</span>
      </div>
    </motion.div>
  );
}
