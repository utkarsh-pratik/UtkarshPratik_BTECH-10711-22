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
    res.status(400).json({ message: "Invalid request" });
    return;
  }

  const task = await Task.findOneAndUpdate(
    { _id: taskId, userId: userId },
    req.body,
    { new: true }
  );
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
