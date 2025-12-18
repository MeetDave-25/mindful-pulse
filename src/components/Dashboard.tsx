import { BreathingOrb } from "@/components/BreathingOrb";
import { RiskMeter } from "@/components/RiskMeter";
import { TrendChart } from "@/components/TrendChart";
import { InsightCard } from "@/components/InsightCard";
import { WellnessScore } from "@/components/WellnessScore";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Moon, Brain, Battery, Heart, ArrowRight } from "lucide-react";

interface DashboardProps {
  onStartCheckIn: () => void;
}

export function Dashboard({ onStartCheckIn }: DashboardProps) {
  // Mock data - in real app would come from state/API
  const riskLevel = "low" as const;
  const riskValue = 28;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
          Good Evening, Friend
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Your mental wellness matters. Let's check in with how you're feeling today.
        </p>
      </motion.div>

      {/* Main Risk Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col items-center py-8"
      >
        <BreathingOrb riskLevel={riskLevel} size="lg" />
        
        <div className="mt-12 w-full max-w-md">
          <RiskMeter value={riskValue} />
        </div>

        <Button 
          variant="calm" 
          size="xl" 
          className="mt-8"
          onClick={onStartCheckIn}
        >
          Daily Check-in
          <ArrowRight className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Wellness Scores Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <WellnessScore
          score={75}
          label="Sleep Quality"
          icon={<Moon className="w-5 h-5" />}
          color="primary"
        />
        <WellnessScore
          score={68}
          label="Focus Level"
          icon={<Brain className="w-5 h-5" />}
          color="low"
        />
        <WellnessScore
          score={45}
          label="Stress Level"
          icon={<Heart className="w-5 h-5" />}
          color="medium"
        />
        <WellnessScore
          score={62}
          label="Energy"
          icon={<Battery className="w-5 h-5" />}
          color="low"
        />
      </div>

      {/* Trend Chart */}
      <TrendChart metric="all" />

      {/* Insights */}
      <div className="space-y-4">
        <h2 className="font-display text-2xl text-foreground">Your Insights</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <InsightCard
            type="positive"
            title="Great Sleep Pattern"
            description="Your sleep quality has improved by 15% this week. Keep maintaining your bedtime routine."
            delay={0.1}
          />
          <InsightCard
            type="tip"
            title="Focus Tip"
            description="Try the Pomodoro technique: 25 minutes of focused work followed by a 5-minute break."
            delay={0.2}
          />
          <InsightCard
            type="trend"
            title="Pattern Detected"
            description="You tend to feel more stressed on Wednesdays. Consider adding a midweek relaxation activity."
            delay={0.3}
          />
          <InsightCard
            type="warning"
            title="Energy Dip Alert"
            description="Your energy levels have been declining since Thursday. Ensure you're staying hydrated."
            delay={0.4}
          />
        </div>
      </div>
    </div>
  );
}
