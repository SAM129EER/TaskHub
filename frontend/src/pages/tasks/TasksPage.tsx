import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, type TaskInput } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, CheckCircle2, Trash2, Edit2, CheckSquare } from "lucide-react";
import type { Task, TaskStatus, TaskPriority } from "@/types/task";
import { toast } from "sonner";

const INITIAL_TASKS: Task[] = [
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

export const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("taskhub_tasks");
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TaskInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      category: "General",
    },
  });

  useEffect(() => {
    localStorage.setItem("taskhub_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const openCreateModal = () => {
    setEditingTask(null);
    reset({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      category: "General",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    reset({
      title: task.title,
      description: task.description || "",
      status: task.status,
      priority: task.priority,
      category: task.category || "General",
    });
    setIsModalOpen(true);
  };

  const onSaveTask = (data: TaskInput) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTask.id
            ? {
                ...t,
                ...data,
                updatedAt: new Date().toISOString(),
              }
            : t
        )
      );
      toast.success("Task updated successfully!");
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTasks((prev) => [newTask, ...prev]);
      toast.success("New task created!");
    }

    setIsModalOpen(false);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast.success("Task deleted");
  };

  const toggleTaskComplete = (task: Task) => {
    const nextStatus: TaskStatus = task.status === "completed" ? "todo" : "completed";
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: nextStatus } : t))
    );
    toast.success(
      nextStatus === "completed" ? "Marked as completed" : "Marked as to do"
    );
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      (t.description && t.description.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || t.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6 p-6 sm:p-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Task Board</h1>
          <p className="text-xs text-muted-foreground">
            Manage your daily tasks and project milestones with ease.
          </p>
        </div>
        <Button onClick={openCreateModal} className="h-10 px-5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-md gap-2 self-start sm:self-auto">
          <Plus className="h-4 w-4" /> Create Task
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-card/40 backdrop-blur-md p-4 rounded-2xl border">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10 rounded-xl bg-background/60"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 min-w-[140px]">
            <Label className="text-xs font-semibold text-muted-foreground whitespace-nowrap">Status:</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-9 text-xs rounded-xl bg-background/60">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 min-w-[140px]">
            <Label className="text-xs font-semibold text-muted-foreground whitespace-nowrap">Priority:</Label>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="h-9 text-xs rounded-xl bg-background/60">
                <SelectValue placeholder="All Priority" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Task Cards Grid */}
      {filteredTasks.length === 0 ? (
        <Card className="py-16 text-center border-dashed rounded-3xl bg-card/30">
          <CardContent className="space-y-3">
            <CheckSquare className="h-12 w-12 text-muted-foreground mx-auto opacity-40" />
            <p className="text-lg font-bold">No tasks found</p>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              No matching tasks fit your current search filter. Add a new task below.
            </p>
            <Button size="sm" onClick={openCreateModal} className="mt-2 gap-1.5 rounded-xl font-semibold">
              <Plus className="h-4 w-4" /> Add New Task
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTasks.map((task) => (
            <Card
              key={task.id}
              className={`rounded-2xl border-border/80 shadow-sm transition-all hover:shadow-md ${
                task.status === "completed" ? "bg-card/40 opacity-80" : "bg-card/75"
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => toggleTaskComplete(task)}
                      className="text-muted-foreground hover:text-emerald-500 transition-colors cursor-pointer"
                      title={task.status === "completed" ? "Mark incomplete" : "Mark completed"}
                    >
                      <CheckCircle2
                        className={`h-5 w-5 ${
                          task.status === "completed"
                            ? "fill-emerald-500 text-background"
                            : ""
                        }`}
                      />
                    </button>
                    <CardTitle
                      className={`text-base font-bold leading-snug ${
                        task.status === "completed" ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {task.title}
                    </CardTitle>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground"
                      onClick={() => openEditModal(task)}
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-lg text-muted-foreground hover:text-destructive"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {task.description && (
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {task.description}
                  </p>
                )}

                <div className="flex items-center justify-between pt-3 border-t text-xs">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        task.status === "completed"
                          ? "success"
                          : task.status === "in_progress"
                          ? "warning"
                          : "info"
                      }
                      className="capitalize text-[10px] font-semibold"
                    >
                      {task.status.replace("_", " ")}
                    </Badge>
                    <Badge
                      variant={
                        task.priority === "high"
                          ? "destructive"
                          : task.priority === "medium"
                          ? "warning"
                          : "secondary"
                      }
                      className="capitalize text-[10px] font-semibold"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  {task.category && (
                    <span className="text-[11px] font-semibold text-muted-foreground">
                      {task.category}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Task Dialog with React Hook Form + Zod */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle>{editingTask ? "Edit Task" : "Create New Task"}</DialogTitle>
            <DialogDescription className="text-xs">
              {editingTask
                ? "Update your task parameters below."
                : "Add a new task item to your personal board."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSaveTask)} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-xs font-semibold">Task Title</Label>
              <Input
                id="title"
                placeholder="e.g. Implement user profile settings"
                className="h-10 rounded-xl"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-xs text-destructive font-medium">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description" className="text-xs font-semibold">Description (Optional)</Label>
              <Input
                id="description"
                placeholder="Notes or context for this task..."
                className="h-10 rounded-xl"
                {...register("description")}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-10 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="todo">To Do</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Priority</Label>
                <Controller
                  name="priority"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-10 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="category" className="text-xs font-semibold">Category</Label>
              <Input
                id="category"
                placeholder="e.g. Frontend, Operations, Design"
                className="h-10 rounded-xl"
                {...register("category")}
              />
            </div>

            <DialogFooter className="pt-3">
              <Button type="button" variant="outline" className="rounded-xl" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl font-semibold">
                {editingTask ? "Save Changes" : "Create Task"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
