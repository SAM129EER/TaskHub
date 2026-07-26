export type TaskStatus = "todo" | "in_progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  category?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskInput {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  category?: string;
}

export interface TaskFilter {
  search: string;
  status: TaskStatus | "all";
  priority: TaskPriority | "all";
  category: string | "all";
}

export interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  todo: number;
}
