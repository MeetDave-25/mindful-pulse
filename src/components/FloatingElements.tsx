import { cn } from "@/lib/utils";

export function FloatingElements({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Floating orbs */}
      <div 
        className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-float"
        style={{ animationDelay: "0s" }}
      />
      <div 
        className="absolute top-40 right-[15%] w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      />
      <div 
        className="absolute bottom-20 left-[20%] w-64 h-64 rounded-full bg-wellness-low/10 blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div 
        className="absolute bottom-40 right-[10%] w-80 h-80 rounded-full bg-wellness-medium/5 blur-3xl animate-float"
        style={{ animationDelay: "1.5s" }}
      />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }}
      />
    </div>
  );
}
