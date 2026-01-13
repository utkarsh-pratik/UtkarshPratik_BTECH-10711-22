// backend/src/middleware/error.middleware.ts
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

// Define a custom error interface if you want to add more properties later
interface HttpError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error for debugging purposes
  console.error(err);

  // Handle Zod validation errors specifically
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation failed",
      details: err.issues.map((issue) => ({
        path: issue.path,
        message: issue.message,
      })),
    });
  }

  // Handle other known errors or default to a 500 server error
  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : "Internal Server Error";

  res.status(statusCode).json({
    error: message,
  });
};