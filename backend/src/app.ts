// backend/src/app.ts
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

// --- CORS Configuration ---
const allowedOrigins = [
  "https://utkarshtaskflow.vercel.app", // Your deployed frontend
  "http://localhost:5173",             // Your local development frontend
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false, // <-- Ensure preflight is handled and not passed to other routes
  optionsSuccessStatus: 204, // <-- Standard success status for OPTIONS requests
};

// Use the single, correctly configured CORS middleware for all requests.
// This will automatically handle preflight OPTIONS requests.
app.use(cors(corsOptions));
// --- End of CORS Configuration ---

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

export default app;