import { Response } from "express";
import { Task } from "../models/task.model";
import { AuthRequest } from "../middleware/auth.middleware";

export const createTask = async (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const task = await Task.create({
    ...req.body,
    userId: req.userId,
  });
  res.status(201).json(task);
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  if (!req.userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const filter: any = { userId: req.userId };
  if (req.query.status) filter.status = req.query.status;

  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  res.json(tasks);
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  const taskId = req.params.id;

  if (!userId || !taskId) {
    return res.status(400).json({ message: "Invalid request" });
  }

  // Create an update object and only add fields that are present in the request
  const updateData: { [key: string]: any } = {};
  const { title, description, status, dueDate } = req.body;

  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (status !== undefined) updateData.status = status;
  if (dueDate !== undefined) updateData.dueDate = dueDate;

  // Prevent sending an empty update object
  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ message: "No update data provided." });
  }

  const task = await Task.findOneAndUpdate(
    { _id: taskId, userId: userId },
    { $set: updateData }, // Use the $set operator for safer updates
    { new: true }
  );

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  const taskId = req.params.id;

  if (!userId || !taskId) {
    res.status(400).json({ message: "Invalid request" });
    return;
  }

  await Task.findOneAndDelete({
    _id: taskId,
    userId: userId,
  });
  res.json({ message: "Task deleted" });
};
