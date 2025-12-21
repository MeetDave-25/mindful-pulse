import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, BarChart2, CheckCircle, Settings, Leaf } from "lucide-react";
import { motion } from "framer-motion";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "checkin", label: "Check-in", icon: CheckCircle },
  { id: "trends", label: "Trends", icon: BarChart2 },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Navigation({ activeTab, onTabChange, className }: NavigationProps) {
  return (
    <nav className={cn("glass-card", className)}>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <Leaf className="w-6 h-6 text-primary" />
          </div>
          <span className="font-display text-xl text-foreground">Mindful</span>
        </div>
        
        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "gap-2",
                activeTab === item.id && "shadow-soft"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-border/50">
        <div className="flex items-center justify-around py-2 px-4">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300",
                activeTab === item.id 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </nav>
  );
}
