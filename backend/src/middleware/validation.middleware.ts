// backend/src/middleware/validation.middleware.ts
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validate =
  (schema: z.ZodObject<any, any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Await the parsing to ensure it's caught by the async error handler
      await schema.parseAsync(req.body);
      // If validation is successful, move to the next middleware (the controller)
      next();
    } catch (error) {
      // If validation fails, pass the error to the global error handler
      next(error);
    }
  };