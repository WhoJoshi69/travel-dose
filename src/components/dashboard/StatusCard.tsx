import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  count: number;
  isActive?: boolean;
  onClick?: () => void;
}

export function StatusCard({ title, count, isActive = false, onClick }: StatusCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4 cursor-pointer transition-colors",
        isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
      )}
      onClick={onClick}
    >
      <p className="text-sm font-medium leading-none">{title}</p>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
} 