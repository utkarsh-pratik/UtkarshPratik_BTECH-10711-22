// frontend/src/types/task.ts
export type Task = {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  dueDate?: string;
};