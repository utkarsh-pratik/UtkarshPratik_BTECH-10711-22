// backend/src/routes/task.routes.ts
import { Router } from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";
import { createTaskSchema, updateTaskSchema } from "../utils/validation";

const router = Router();

router.use(authMiddleware);

router.post("/", validate(createTaskSchema), createTask);
router.get("/", getTasks);
router.put("/:id", validate(updateTaskSchema), updateTask);
router.delete("/:id", deleteTask);

export default router;