import { BreathingOrb } from "@/components/BreathingOrb";
import { RiskMeter } from "@/components/RiskMeter";
import { TrendChart } from "@/components/TrendChart";
import { InsightCard } from "@/components/InsightCard";
import { WellnessScore } from "@/components/WellnessScore";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Moon, Brain, Battery, Heart, ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { burnoutService } from "@/services/burnout.service";
import { useAuth } from "@/contexts/AuthContext";
import type { RiskAnalysis } from "@/types/api.types";

interface DashboardProps {
  onStartCheckIn: () => void;
}

export function Dashboard({ onStartCheckIn }: DashboardProps) {
  const { username } = useAuth();
  const [analysis, setAnalysis] = useState<RiskAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await burnoutService.getDashboardStatus();
        setAnalysis(data);
      } catch (error) {
        console.error("Failed to fetch dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const riskLevel = analysis?.risk_level?.toLowerCase() as "low" | "medium" | "high" || "low";
  const riskValue = analysis?.risk_score || 0;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
          Good Evening, {username || "Friend"}
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
        {loading ? (
          <Loader2 className="w-16 h-16 animate-spin text-primary" />
        ) : (
          <>
            <BreathingOrb riskLevel={riskLevel} size="lg" />

            <div className="mt-12 w-full max-w-md">
              <RiskMeter value={riskValue} />
            </div>
          </>
        )}

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

      {/* Insights */}
      {analysis && analysis.insights.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-display text-2xl text-foreground">Your Insights</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {analysis.insights.map((insight, index) => (
              <InsightCard
                key={index}
                type={analysis.risk_level === "High" ? "warning" : analysis.risk_level === "Medium" ? "tip" : "positive"}
                title={`Insight ${index + 1}`}
                description={insight}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
