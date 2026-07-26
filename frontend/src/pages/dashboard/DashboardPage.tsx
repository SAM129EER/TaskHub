import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { EmailVerificationBanner } from "@/components/common/EmailVerificationBanner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, AlertCircle, Plus, ArrowRight, ListTodo, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";
import type { Task } from "@/types/task";

const INITIAL_DEMO_TASKS: Task[] = [
  {
    id: "1",
    title: "Verify account security settings",
    description: "Ensure email is verified and authentication token flows smoothly.",
    status: "in_progress",
    priority: "high",
    category: "Security",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Setup TaskHub project workspace",
    description: "Initial frontend and backend API integration.",
    status: "completed",
    priority: "medium",
    category: "DevOps",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Review upcoming backend endpoints",
    description: "Align frontend routes with upcoming task & category endpoints.",
    status: "todo",
    priority: "low",
    category: "Backend",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("taskhub_tasks");
    return saved ? JSON.parse(saved) : INITIAL_DEMO_TASKS;
  });

  useEffect(() => {
    localStorage.setItem("taskhub_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const inProgressCount = tasks.filter((t) => t.status === "in_progress").length;
  const todoCount = tasks.filter((t) => t.status === "todo").length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-8 p-6 sm:p-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-900/90 via-indigo-800/80 to-purple-900/90 text-white shadow-xl border border-indigo-500/20">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md text-white border border-white/20">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" /> Active Workspace
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Welcome back, {user?.name || "User"}
            </h1>
            <p className="text-sm text-indigo-200 max-w-lg leading-relaxed">
              Track project milestones, monitor completion rates, and manage your productivity task board.
            </p>
          </div>

          <Button
            onClick={() => navigate("/tasks")}
            className="h-11 px-6 rounded-2xl bg-white text-indigo-900 hover:bg-white/90 font-bold shadow-lg shadow-black/20 transition-all hover:scale-[1.02] gap-2 self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" /> Open Task Board
          </Button>
        </div>
      </div>

      {/* Verification Banner if unverified */}
      <EmailVerificationBanner />

      {/* Stats Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="rounded-2xl border-border/80 bg-card/60 backdrop-blur-md shadow-md hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
              Total Tasks
            </CardTitle>
            <div className="h-9 w-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <ListTodo className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-extrabold">{totalCount}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500" /> Workspace tasks tracked
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/80 bg-card/60 backdrop-blur-md shadow-md hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
              In Progress
            </CardTitle>
            <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Clock className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-extrabold">{inProgressCount}</div>
            <p className="text-xs text-muted-foreground">Active tasks in flight</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/80 bg-card/60 backdrop-blur-md shadow-md hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
              Completed
            </CardTitle>
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-extrabold">{completedCount}</div>
            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/80 bg-card/60 backdrop-blur-md shadow-md hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
              Pending To Do
            </CardTitle>
            <div className="h-9 w-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <AlertCircle className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-extrabold">{todoCount}</div>
            <p className="text-xs text-muted-foreground">Queued for execution</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Tasks & Security Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        <Card className="lg:col-span-2 rounded-2xl border-border/80 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-xl">Active Task Queue</CardTitle>
              <CardDescription className="text-xs">Tasks requiring your attention</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate("/tasks")} className="gap-1.5 text-xs font-semibold">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </CardHeader>
          <CardContent>
            {tasks.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground text-sm space-y-2">
                <ListTodo className="h-8 w-8 mx-auto opacity-50" />
                <p>No tasks found. Open Task Board to add your first item.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.slice(0, 4).map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-border/70 bg-card/60 hover:bg-accent/40 transition-all gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-sm">{task.title}</span>
                        {task.category && (
                          <Badge variant="outline" className="text-[10px] py-0 rounded-md font-semibold">
                            {task.category}
                          </Badge>
                        )}
                      </div>
                      {task.description && (
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {task.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <Badge
                        variant={
                          task.status === "completed"
                            ? "success"
                            : task.status === "in_progress"
                            ? "warning"
                            : "info"
                        }
                        className="capitalize text-[11px] font-semibold"
                      >
                        {task.status.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security Widget */}
        <Card className="rounded-2xl border-border/80 shadow-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Security & Profile</CardTitle>
            </div>
            <CardDescription className="text-xs">Live session details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Account Name:</span>
                <span className="font-bold">{user?.name}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-semibold truncate max-w-[150px]">{user?.email}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Verification:</span>
                {user?.emailVerified ? (
                  <Badge variant="success" className="text-[10px]">Verified</Badge>
                ) : (
                  <Badge variant="warning" className="text-[10px]">Pending</Badge>
                )}
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full text-xs font-semibold rounded-xl"
              onClick={() => navigate("/profile")}
            >
              Account Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
