import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Brain, Eye, Battery, Heart, Loader2 } from "lucide-react";
import { burnoutService } from "@/services/burnout.service";
import { useToast } from "@/hooks/use-toast";
import type { Question as APIQuestion } from "@/types/api.types";

interface Question extends APIQuestion {
  icon: React.ReactNode;
}

// Icon mapping based on category
const getCategoryIcon = (category: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    Sleep: <Moon className="w-5 h-5" />,
    Focus: <Brain className="w-5 h-5" />,
    Energy: <Battery className="w-5 h-5" />,
    Mood: <Sun className="w-5 h-5" />,
    "Screen Fatigue": <Eye className="w-5 h-5" />,
    Stress: <Heart className="w-5 h-5" />,
  };
  return iconMap[category] || <Brain className="w-5 h-5" />;
};

const responseOptions = [
  { value: 1, label: "Not at all", emoji: "😊" },
  { value: 2, label: "A little", emoji: "🙂" },
  { value: 3, label: "Moderately", emoji: "😐" },
  { value: 4, label: "Quite a bit", emoji: "😔" },
  { value: 5, label: "Extremely", emoji: "😫" },
];

interface CheckInCardProps {
  onComplete?: (responses: Record<string, number>) => void;
  className?: string;
}

export function CheckInCard({ onComplete, className }: CheckInCardProps) {
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch daily questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const apiQuestions = await burnoutService.getDailyQuestions();
        const questionsWithIcons = apiQuestions.map(q => ({
          ...q,
          icon: getCategoryIcon(q.category),
        }));
        setCurrentQuestions(questionsWithIcons);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load questions. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [toast]);

  if (loading) {
    return (
      <div className={cn("glass-card p-8 text-center", className)}>
        <Loader2 className="w-8 h-8 mx-auto animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading questions...</p>
      </div>
    );
  }

  if (currentQuestions.length === 0) {
    return (
      <div className={cn("glass-card p-8 text-center", className)}>
        <p className="text-muted-foreground">No questions available today.</p>
      </div>
    );
  }

  const currentQuestion = currentQuestions[currentIndex];

  const handleResponse = async (value: number) => {
    const newResponses = { ...responses, [currentQuestion.id]: value };
    setResponses(newResponses);

    // Submit response to API
    try {
      await burnoutService.submitResponse({
        question_id: currentQuestion.id,
        answer_value: value,
      });
    } catch (error) {
      console.error("Failed to submit response:", error);
    }

    if (currentIndex < currentQuestions.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
    } else {
      setIsComplete(true);
      onComplete?.(newResponses);
    }
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn("glass-card p-8 text-center", className)}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center"
        >
          <Heart className="w-10 h-10 text-primary-foreground" />
        </motion.div>
        <h3 className="font-display text-2xl mb-2">Thank You</h3>
        <p className="text-muted-foreground">
          Your check-in has been recorded. Take care of yourself today.
        </p>
      </motion.div>
    );
  }

  return (
    <div className={cn("glass-card p-6 md:p-8", className)}>
      {/* Progress indicator */}
      <div className="flex gap-2 mb-8">
        {currentQuestions.map((_, idx) => (
          <div
            key={idx}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-all duration-500",
              idx <= currentIndex ? "bg-primary" : "bg-secondary"
            )}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Category badge */}
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-secondary text-primary">
              {currentQuestion.icon}
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {currentQuestion.category}
            </span>
          </div>

          {/* Question */}
          <h3 className="font-display text-xl md:text-2xl mb-8 text-foreground leading-relaxed">
            {currentQuestion.text}
          </h3>

          {/* Response options */}
          <div className="grid gap-3">
            {responseOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleResponse(option.value)}
                className={cn(
                  "w-full p-4 rounded-xl border border-border/50 bg-secondary/30",
                  "flex items-center gap-4 text-left",
                  "hover:bg-secondary hover:border-primary/30 transition-all duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50"
                )}
              >
                <span className="text-2xl">{option.emoji}</span>
                <span className="font-medium text-foreground">{option.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Skip option */}
      <div className="mt-6 text-center">
        <button
          onClick={() => {
            if (currentIndex < currentQuestions.length - 1) {
              setCurrentIndex(currentIndex + 1);
            } else {
              setIsComplete(true);
              onComplete?.(responses);
            }
          }}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip this question
        </button>
      </div>
    </div>
  );
}
