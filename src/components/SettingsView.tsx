import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Bell, Moon, Shield, Trash2, Download, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const settingsGroups = [
  {
    title: "Notifications",
    icon: Bell,
    items: [
      { label: "Daily check-in reminder", description: "Get a gentle nudge at your preferred time", enabled: true },
      { label: "Weekly insights", description: "Receive your weekly wellness summary", enabled: true },
      { label: "Risk alerts", description: "Be notified when patterns indicate rising risk", enabled: false },
    ],
  },
  {
    title: "Privacy",
    icon: Shield,
    items: [
      { label: "Anonymous mode", description: "No personal identifiers stored", enabled: true },
      { label: "Local-only data", description: "Keep all data on your device", enabled: false },
    ],
  },
];

export function SettingsView() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-6"
      >
        <h1 className="font-display text-3xl md:text-4xl text-foreground mb-3">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Customize your wellness experience
        </p>
      </motion.div>

      {/* Settings Groups */}
      {settingsGroups.map((group, groupIndex) => (
        <motion.div
          key={group.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: groupIndex * 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <group.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display text-xl text-foreground">{group.title}</h3>
          </div>

          <div className="space-y-4">
            {group.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/30"
              >
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {item.description}
                  </p>
                </div>
                <button
                  className={cn(
                    "w-12 h-7 rounded-full transition-all duration-300 relative",
                    item.enabled
                      ? "bg-primary"
                      : "bg-secondary border border-border"
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-1 w-5 h-5 rounded-full bg-background shadow-sm transition-all duration-300",
                      item.enabled ? "left-6" : "left-1"
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Data Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <h3 className="font-display text-xl text-foreground mb-6">Data Management</h3>
        
        <div className="space-y-3">
          <Button variant="soft" className="w-full justify-start gap-3">
            <Download className="w-5 h-5" />
            Export Your Data
          </Button>
          <Button variant="outline" className="w-full justify-start gap-3 text-destructive hover:text-destructive">
            <Trash2 className="w-5 h-5" />
            Delete All Data
          </Button>
        </div>
      </motion.div>

      {/* About */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center py-8"
      >
        <div className="inline-flex items-center gap-2 text-muted-foreground">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-wellness-high fill-wellness-high" />
          <span>for your wellbeing</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Mindful v1.0 • Patterns, not answers
        </p>
      </motion.div>
    </div>
  );
}
