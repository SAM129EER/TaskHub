import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, CheckSquare, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Profile", href: "/profile", icon: User },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 border-r bg-card/40 backdrop-blur-md hidden md:block min-h-[calc(100vh-4rem)] p-4 transition-all">
      <div className="space-y-6">
        <div className="px-3 pt-2">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground/80">
            Workspace
          </p>
        </div>

        <nav className="space-y-1.5">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-primary to-indigo-600 text-white shadow-md shadow-primary/25"
                      : "text-muted-foreground hover:bg-accent/80 hover:text-foreground"
                  )
                }
              >
                <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Pro Tip Card */}
        <div className="mt-8 rounded-2xl p-4 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-primary/15 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Productivity Hub
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Organize tasks, track status changes, and synchronize seamlessly with your backend API.
          </p>
        </div>
      </div>
    </aside>
  );
};
