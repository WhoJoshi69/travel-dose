import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          ...(isLogin ? {} : {
            firstName: formData.firstName,
            lastName: formData.lastName,
          }),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An error occurred");
      }

      localStorage.setItem("token", data.access_token);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[450px]">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl font-bold tracking-tight">
          {isLogin ? "Welcome back" : "Create an account"}
        </CardTitle>
        <CardDescription>
          {isLogin
            ? "Enter your credentials to sign in"
            : "Enter your details to sign up"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="space-y-4 px-6 pb-6">
        {error && (
          <div className="text-sm font-medium text-destructive">
            {error}
          </div>
        )}
        {!isLogin && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                disabled={loading}
              />
            </div>
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            disabled={loading}
          />
        </div>
        {!isLogin && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              disabled={loading}
            />
          </div>
        )}
        <Button className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLogin ? "Sign In" : "Sign Up"}
        </Button>
        <div className="text-center text-sm">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: ""
              });
            }}
            className="text-primary hover:underline focus:outline-none"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </form>
    </Card>
  );
} 