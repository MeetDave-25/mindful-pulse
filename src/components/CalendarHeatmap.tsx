import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, subMonths, getDay, isSameMonth } from "date-fns";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CalendarHeatmapProps {
  className?: string;
}

// Generate mock wellness data for demonstration
const generateMockData = () => {
  const data: Record<string, number> = {};
  const today = new Date();
  
  for (let i = 0; i < 90; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = format(date, "yyyy-MM-dd");
    // Generate random wellness score 0-100
    data[dateStr] = Math.floor(Math.random() * 40) + 50; // 50-90 range mostly
    // Add some variance
    if (Math.random() > 0.8) {
      data[dateStr] = Math.floor(Math.random() * 30) + 20; // Lower scores occasionally
    }
  }
  return data;
};

const mockWellnessData = generateMockData();

const getColorForScore = (score: number | undefined) => {
  if (score === undefined) return "bg-secondary/30";
  if (score >= 80) return "bg-wellness-low";
  if (score >= 60) return "bg-wellness-low/60";
  if (score >= 40) return "bg-wellness-medium";
  if (score >= 20) return "bg-wellness-high/60";
  return "bg-wellness-high";
};

const getTextForScore = (score: number | undefined) => {
  if (score === undefined) return "No data";
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  if (score >= 20) return "Low";
  return "Critical";
};

export function CalendarHeatmap({ className }: CalendarHeatmapProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get the day of week for the first day (0 = Sunday)
  const startDayOfWeek = getDay(monthStart);
  
  // Create padding for days before the month starts
  const paddingDays = Array(startDayOfWeek).fill(null);

  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    if (nextMonth <= new Date()) {
      setCurrentMonth(nextMonth);
    }
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("glass-card p-6", className)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-xl text-foreground">
          Wellness Calendar
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPreviousMonth}
            className="h-8 w-8"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="font-medium text-foreground min-w-[140px] text-center">
            {format(currentMonth, "MMMM yyyy")}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNextMonth}
            disabled={isSameMonth(currentMonth, new Date())}
            className="h-8 w-8"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Padding for days before month start */}
        {paddingDays.map((_, index) => (
          <div key={`pad-${index}`} className="aspect-square" />
        ))}
        
        {/* Actual days */}
        {days.map((day) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const score = mockWellnessData[dateStr];
          const isHovered = hoveredDay === dateStr;
          const isToday = format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");

          return (
            <motion.div
              key={dateStr}
              whileHover={{ scale: 1.1 }}
              onMouseEnter={() => setHoveredDay(dateStr)}
              onMouseLeave={() => setHoveredDay(null)}
              className={cn(
                "aspect-square rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 relative",
                getColorForScore(score),
                isToday && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                isHovered && "shadow-lg z-10"
              )}
            >
              <span className={cn(
                "text-xs font-medium",
                score !== undefined && score >= 60 ? "text-primary-foreground" : "text-foreground"
              )}>
                {format(day, "d")}
              </span>

              {/* Tooltip */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-2 bg-popover border border-border rounded-lg shadow-lg whitespace-nowrap z-20"
                >
                  <p className="text-xs font-medium text-foreground">
                    {format(day, "MMM d, yyyy")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Score: {score ?? "No data"}
                    {score && ` (${getTextForScore(score)})`}
                  </p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Lower Risk</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 rounded bg-wellness-low" />
            <div className="w-4 h-4 rounded bg-wellness-low/60" />
            <div className="w-4 h-4 rounded bg-wellness-medium" />
            <div className="w-4 h-4 rounded bg-wellness-high/60" />
            <div className="w-4 h-4 rounded bg-wellness-high" />
          </div>
          <span className="text-xs text-muted-foreground">Higher Risk</span>
        </div>
      </div>
    </motion.div>
  );
}
