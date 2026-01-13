// backend/src/utils/validation.ts
import { z } from "zod";

// A regex that requires at least one uppercase letter, one lowercase letter, one number, and one special character.
const passwordValidation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);

// Schema for user registration
export const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(passwordValidation, {
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
});

// Schema for user login
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// Schema for creating a new task
export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  dueDate: z.string().date().optional(), // Expects ISO 8601 date string
});

// Schema for updating a task
// Allows partial updates, so all fields are optional
export const updateTaskSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().optional(),
  status: z.enum(["pending", "in-progress", "completed"]).optional(),
  dueDate: z.string().date().optional(),
});

export const updateUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
});