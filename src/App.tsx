import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LoginForm } from "@/components/auth/LoginForm";
import { SelectionCard } from "@/components/selection-card";
import { Users, User, Plane } from "lucide-react";
import { useState } from "react";
import { UserNav } from "@/components/user-nav";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selected, setSelected] = useState<"individual" | "organization" | null>(null);

  if (!isAuthenticated) {
    return (
      <ThemeProvider defaultTheme="light">
        <div className="min-h-screen w-full bg-background text-foreground antialiased">
          <ThemeToggle />
          <main className="flex min-h-screen w-full items-center justify-center p-4">
            <LoginForm onSuccess={() => setIsAuthenticated(true)} />
          </main>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen w-full bg-background text-foreground antialiased">
        <div className="flex justify-between items-center p-4">
          <ThemeToggle />
          <UserNav onLogout={() => setIsAuthenticated(false)} />
        </div>
        <main className="container mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-16">
          <div className="mb-12 text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Plane className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold tracking-tight">Dosepack Travel</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Plan your perfect trip, whether you're traveling solo or managing
              group travel
            </p>
          </div>

          <div className="grid w-full max-w-3xl gap-6 md:grid-cols-2">
            <SelectionCard
              title="Individual Travel"
              description="Plan your personal journey with customized itineraries and travel recommendations"
              icon={<User className="h-6 w-6" />}
              onClick={() => setSelected("individual")}
              selected={selected === "individual"}
            />
            <SelectionCard
              title="Organization Travel"
              description="Manage group travel, coordinate multiple itineraries, and track expenses"
              icon={<Users className="h-6 w-6" />}
              onClick={() => setSelected("organization")}
              selected={selected === "organization"}
            />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;