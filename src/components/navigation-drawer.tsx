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

const navigationItems = [
  {
    title: "My Expenses",
    href: "/expenses",
  },
  {
    title: "My Trips",
    href: "/trips",
  },
  {
    title: "Travel History",
    href: "/history",
  },
];

export function NavigationDrawer() {
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
              key={item.href}
              variant="ghost"
              className="w-full justify-start text-lg font-normal"
            >
              {item.title}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
} 