import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  count: number;
  isActive?: boolean;
}

export function StatusCard({ title, count, isActive }: StatusCardProps) {
  return (
    <Card className={cn(
      "transition-colors hover:border-primary/50",
      isActive && "border-primary bg-primary/5"
    )}>
      <CardContent className="p-4">
        <div className="text-sm font-medium text-muted-foreground">{title}</div>
        <div className="text-2xl font-bold">{count}</div>
      </CardContent>
    </Card>
  );
} 