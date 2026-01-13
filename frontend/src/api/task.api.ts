// frontend/src/api/task.api.ts
import api from "./axios";
import type { Task } from "../types/task";

export const fetchTasks = (status?: Task["status"]) => {
  const params = status ? { status } : {};
  return api.get<Task[]>("/tasks", { params });
};

export const updateTaskStatus = (id: string, status: Task["status"]) =>
  api.put(`/tasks/${id}`, { status });

export const createTask = (taskData: {
  title: string;
  description?: string;
  dueDate?: string;
}) => api.post<Task>("/tasks", taskData);

// Add this function to update any part of a task
export const updateTask = (
  id: string,
  taskData: Partial<Omit<Task, "_id" | "status">>
) => api.put<Task>(`/tasks/${id}`, taskData);

// Add this function to delete a task
export const deleteTask = (id: string) => api.delete(`/tasks/${id}`);