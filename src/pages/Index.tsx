import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Dashboard } from "@/components/Dashboard";
import { CheckInCard } from "@/components/CheckInCard";
import { TrendsView } from "@/components/TrendsView";
import { SettingsView } from "@/components/SettingsView";
import { FloatingElements } from "@/components/FloatingElements";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleCheckInComplete = (responses: Record<string, number>) => {
    console.log("Check-in completed:", responses);
    // In a real app, this would save to state/database
    setTimeout(() => setActiveTab("dashboard"), 2000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard onStartCheckIn={() => setActiveTab("checkin")} />;
      case "checkin":
        return (
          <div className="max-w-lg mx-auto py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="font-display text-3xl text-foreground mb-2">
                Daily Check-in
              </h1>
              <p className="text-muted-foreground">
                Take a moment to reflect on how you're feeling
              </p>
            </motion.div>
            <CheckInCard onComplete={handleCheckInComplete} />
          </div>
        );
      case "trends":
        return <TrendsView />;
      case "settings":
        return <SettingsView />;
      default:
        return <Dashboard onStartCheckIn={() => setActiveTab("checkin")} />;
    }
  };

  return (
    <div className="min-h-screen gradient-calm relative">
      <FloatingElements />
      
      <div className="relative z-10">
        {/* Desktop Nav */}
        <div className="hidden md:block sticky top-0 z-50">
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Main Content */}
        <main className="container max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Mobile Nav */}
        <Navigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          className="md:hidden"
        />
      </div>
    </div>
  );
};

export default Index;
