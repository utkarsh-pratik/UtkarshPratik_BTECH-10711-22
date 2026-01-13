// backend/src/routes/user.routes.ts
import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";
import { updateUserSchema } from "../utils/validation";
import { getProfile, updateProfile, deleteProfile } from "../controllers/user.controller";

const router = Router();

// All user routes should be protected
router.use(authMiddleware);

router.get("/me", getProfile);
router.put("/me", validate(updateUserSchema), updateProfile);
router.delete("/me", deleteProfile);

export default router;