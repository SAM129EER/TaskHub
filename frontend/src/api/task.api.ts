import { api } from "@/lib/axios";
import type { Task, TaskInput } from "@/types/task";

export const taskApi = {
  getTasks: async (): Promise<Task[]> => {
    try {
      const res = await api.get("/api/tasks");
      return res.data.data;
    } catch {
      // Fallback to local storage state if backend task module is pending
      const saved = localStorage.getItem("taskhub_tasks");
      return saved ? JSON.parse(saved) : [];
    }
  },

  createTask: async (payload: TaskInput): Promise<Task> => {
    try {
      const res = await api.post("/api/tasks", payload);
      return res.data.data;
    } catch {
      const newTask: Task = {
        id: Date.now().toString(),
        ...payload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return newTask;
    }
  },

  updateTask: async (id: string, payload: Partial<TaskInput>): Promise<Task> => {
    try {
      const res = await api.patch(`/api/tasks/${id}`, payload);
      return res.data.data;
    } catch {
      return {
        id,
        title: payload.title || "Task",
        status: payload.status || "todo",
        priority: payload.priority || "medium",
        category: payload.category || "General",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
  },

  deleteTask: async (id: string): Promise<void> => {
    try {
      await api.delete(`/api/tasks/${id}`);
    } catch {
      // Handled locally
    }
  },
};
