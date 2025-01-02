import { Plane } from "lucide-react";
import { cn } from "@/lib/utils";

export function AnimatedHeader({ className }: { className?: string }) {
  return (
    <button 
      className={cn(
        "group flex items-center gap-2 rounded-md bg-background px-4 py-2 transition-all duration-300 hover:-translate-y-2",
        "hover:shadow-[0_7px_0_-2px_hsl(var(--primary)),0_15px_0_-4px_hsl(var(--secondary)),0_16px_10px_-3px_hsl(var(--secondary))]",
        "active:translate-y-[-5px] active:shadow-[0_2px_0_-2px_hsl(var(--primary)),0_8px_0_-4px_hsl(var(--secondary)),0_12px_10px_-3px_hsl(var(--secondary))]",
        "active:duration-200",
        className
      )}
    >
      <Plane className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
      <span className="text-xl font-bold">Dose Travel</span>
    </button>
  );
} 