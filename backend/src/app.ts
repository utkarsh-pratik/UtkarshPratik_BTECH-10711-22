// backend/src/app.ts
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import userRoutes from "./routes/user.routes"; // <-- Import user routes
import { errorHandler } from "./middleware/error.middleware"; // <-- Import the handler

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes); // <-- Register user routes

// Register the error handler as the last middleware
app.use(errorHandler); // <-- Add this line

export default app;