import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface NavigationDrawerProps {
  onViewChange: (view: 'trips' | 'expenses' | 'history') => void;
  currentView: 'trips' | 'expenses' | 'history';
}

const navigationItems = [
  {
    title: "My Expenses",
    view: 'expenses' as const,
  },
  {
    title: "My Trips",
    view: 'trips' as const,
  },
  {
    title: "Travel History",
    view: 'history' as const,
  },
];

export function NavigationDrawer({ onViewChange, currentView }: NavigationDrawerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.view}
              variant="ghost"
              className={cn(
                "w-full justify-start text-lg font-normal",
                currentView === item.view && "bg-primary text-primary-foreground"
              )}
              onClick={() => onViewChange(item.view)}
            >
              {item.title}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
} 