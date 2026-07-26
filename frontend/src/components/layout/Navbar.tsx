import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle2, AlertCircle, LogOut, Sun, Moon, CheckSquare, User as UserIcon, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/sign-in");
    } catch {
      toast.error("Logout failed");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 transition-all">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98]">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md glow-primary">
            <CheckSquare className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                TaskHub
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
                PRO
              </span>
            </div>
            <span className="text-[10px] font-medium text-muted-foreground tracking-wider uppercase -mt-0.5">
              Productivity Engine
            </span>
          </div>
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-xl hover:bg-accent/60 transition-all"
            title="Toggle color theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400 transition-transform rotate-0 scale-100" />
            ) : (
              <Moon className="h-4 w-4 text-indigo-600 transition-transform rotate-0 scale-100" />
            )}
          </Button>

          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-primary/20 hover:ring-primary/40 transition-all p-0">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-sm">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60 p-2 shadow-2xl rounded-2xl border-border/80 glass-panel" align="end">
                  <DropdownMenuLabel className="font-normal p-2">
                    <div className="flex flex-col space-y-1.5">
                      <p className="text-sm font-bold leading-none">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      <div className="pt-1">
                        {user.emailVerified ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <CheckCircle2 className="h-3 w-3" /> Verified Account
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            <AlertCircle className="h-3 w-3" /> Unverified
                          </span>
                        )}
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuItem onClick={() => navigate("/dashboard")} className="rounded-lg cursor-pointer py-2">
                    <Sparkles className="mr-2 h-4 w-4 text-primary" /> Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/tasks")} className="rounded-lg cursor-pointer py-2">
                    <CheckSquare className="mr-2 h-4 w-4 text-primary" /> Task Board
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/profile")} className="rounded-lg cursor-pointer py-2">
                    <UserIcon className="mr-2 h-4 w-4 text-primary" /> Profile & Account
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="rounded-lg cursor-pointer py-2 text-destructive focus:text-destructive focus:bg-destructive/10"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate("/sign-in")} className="rounded-xl">
                Sign In
              </Button>
              <Button
                size="sm"
                onClick={() => navigate("/sign-up")}
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02]"
              >
                Get Started
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
