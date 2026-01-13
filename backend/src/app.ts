// backend/src/app.ts
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

// --- CORS Configuration ---
// Define the list of allowed origins (your frontend URLs)
const allowedOrigins = [
  "https://utkarshtaskflow.vercel.app", // Your deployed frontend
  "http://localhost:5173",             // Your local development frontend
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // Allow cookies to be sent
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow all standard methods
  allowedHeaders: "Content-Type,Authorization", // Allow necessary headers
};

app.use(cors(corsOptions));
// --- End of CORS Configuration ---

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

export default app;