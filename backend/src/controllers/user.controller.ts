// backend/src/controllers/user.controller.ts
import { Response } from "express";
import { User } from "../models/user.model";
import { Task } from "../models/task.model";
import type { AuthRequest } from "../middleware/auth.middleware";

// Get current user's profile
export const getProfile = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.userId).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

// Update current user's profile
export const updateProfile = async (req: AuthRequest, res: Response) => {
  const { name } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.userId,
    { name },
    { new: true }
  ).select("-password");

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(updatedUser);
};

// Delete current user's account
export const deleteProfile = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;

  // Add this check to ensure userId is not undefined
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // First, delete all tasks associated with the user
  await Task.deleteMany({ userId });
  // Then, delete the user
  await User.findByIdAndDelete(userId);

  res.json({ message: "User account and all associated data deleted successfully." });
};