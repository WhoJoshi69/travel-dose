import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LoginForm } from "@/components/auth/LoginForm";
import { SelectionCard } from "@/components/selection-card";
import { Users, User, Plane } from "lucide-react";
import { useState } from "react";
import { UserNav } from "@/components/user-nav";
import { EmployeeDashboard } from "@/components/dashboard/EmployeeDashboard";
import { ExpensesDashboard } from "@/components/expenses/ExpensesDashboard";
import { AnimatedHeader } from "@/components/animated-header";
import { NavigationDrawer } from "@/components/navigation-drawer";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<'trips' | 'expenses' | 'history'>('trips');

  const handleHeaderClick = () => {
    setCurrentView('trips');
  };

  if (!isAuthenticated) {
    return (
      <ThemeProvider defaultTheme="light">
        <div className="min-h-screen w-full bg-background text-foreground antialiased">
          <div className="absolute right-4 top-4">
            <ThemeToggle />
          </div>
          <main className="flex min-h-screen w-full flex-col items-center justify-center p-4">
            <div className="mb-8">
              <AnimatedHeader className="!bg-transparent" />
            </div>
            <LoginForm onSuccess={() => setIsAuthenticated(true)} />
          </main>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen w-full bg-background text-foreground antialiased">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-4">
            <NavigationDrawer 
              onViewChange={setCurrentView}
              currentView={currentView}
            />
            <div onClick={handleHeaderClick} className="cursor-pointer">
              <AnimatedHeader />
            </div>
          </div>
          <UserNav onLogout={() => setIsAuthenticated(false)} />
        </div>
        {currentView === 'expenses' ? (
          <ExpensesDashboard />
        ) : (
          <EmployeeDashboard />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;