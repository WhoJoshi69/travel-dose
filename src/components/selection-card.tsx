import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SelectionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  selected?: boolean;
}

export function SelectionCard({
  title,
  description,
  icon,
  onClick,
  selected,
}: SelectionCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={cn(
          "relative cursor-pointer overflow-hidden p-6 transition-colors",
          selected
            ? "border-primary bg-primary/10"
            : "hover:border-primary/50 hover:bg-accent"
        )}
        onClick={onClick}
      >
        <div className="mb-4 text-4xl text-primary">{icon}</div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </Card>
    </motion.div>
  );
}