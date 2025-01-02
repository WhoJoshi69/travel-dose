import { useTheme } from "@/components/theme-provider";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SharedThemeToggleProps {
  variant?: "button" | "menu-item";
}

export function SharedThemeToggle({ variant = "button" }: SharedThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  if (variant === "menu-item") {
    return (
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      >
        <div className="flex flex-1 items-center gap-2">
          <motion.div
            initial={false}
            animate={{ rotate: isDark ? 360 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative h-4 w-4"
          >
            {isDark ? (
              <Moon className="absolute h-4 w-4" />
            ) : (
              <Sun className="absolute h-4 w-4" />
            )}
          </motion.div>
          <span>Theme</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {isDark ? "Dark" : "Light"}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background shadow-sm",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      )}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 360 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative h-5 w-5"
      >
        {isDark ? (
          <Moon className="absolute h-5 w-5" />
        ) : (
          <Sun className="absolute h-5 w-5" />
        )}
      </motion.div>
    </button>
  );
} 