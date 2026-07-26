import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, ShieldCheck, Zap, Layers, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-24 px-4 text-center overflow-hidden border-b">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="container mx-auto max-w-4xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary shadow-sm hover:bg-primary/15 transition-all">
            <Sparkles className="h-3.5 w-3.5" /> Production Ready Task Management
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
            Streamline Workflows with{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Effortless Precision
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            TaskHub provides a clean, secure, and intuitive environment for managing your daily tasks, tracking status changes, and accelerating your productivity.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            {isAuthenticated ? (
              <Button
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="h-12 px-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] gap-2.5"
              >
                Go to Dashboard <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <>
                <Button
                  size="lg"
                  onClick={() => navigate("/sign-up")}
                  className="h-12 px-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] gap-2.5 w-full sm:w-auto"
                >
                  Get Started Free <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/sign-in")}
                  className="h-12 px-8 rounded-2xl font-semibold border-border hover:bg-accent/80 transition-all w-full sm:w-auto"
                >
                  Sign In
                </Button>
              </>
            )}
          </div>

          {/* Feature Highlights Bar */}
          <div className="pt-8 flex flex-wrap justify-center items-center gap-6 text-xs text-muted-foreground font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Full JWT Auth & Cookies
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> React Hook Form + Zod
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Dark & Light Glass Theme
            </span>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-20 px-4 container mx-auto">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Designed for Modern Execution</h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Built with modern web standards and complete alignment with your backend APIs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="rounded-2xl border-border/80 bg-card/60 backdrop-blur-md shadow-lg hover:shadow-xl hover:border-primary/40 transition-all duration-300">
            <CardHeader className="space-y-3">
              <div className="h-12 w-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <CheckSquare className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Task Board Engine</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Manage tasks with clean status badges, custom priorities, quick completion toggles, and modal dialogs.
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/80 bg-card/60 backdrop-blur-md shadow-lg hover:shadow-xl hover:border-primary/40 transition-all duration-300">
            <CardHeader className="space-y-3">
              <div className="h-12 w-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Secure Authentication</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Complete authentication flow including email verification, token refresh, password resets, and session rehydration.
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/80 bg-card/60 backdrop-blur-md shadow-lg hover:shadow-xl hover:border-primary/40 transition-all duration-300">
            <CardHeader className="space-y-3">
              <div className="h-12 w-12 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center">
                <Layers className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Shadcn UI Aesthetic</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Designed with glassmorphism, responsive Tailwind CSS v4, custom theme variables, and micro-interactions.
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};
