import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo.js";
import {
  createResume,
  getUserResumes,
  getResume,
  updateResume,
  deleteResume,
} from "./routes/resumes.js";
import { createUser, getUserByEmail, getUser } from "./routes/users.js";
import protectedRoutes from "./routes/protected.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (_req, res) => {
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// Public API routes
app.get("/api/ping", (_req, res) => {
  res.json({ message: "Backend server is running with Clerk auth!" });
});

app.get("/api/demo", handleDemo);

// Legacy user routes (for backward compatibility)
app.post("/api/users", createUser);
app.get("/api/users/email/:email", getUserByEmail);
app.get("/api/users/:id", getUser);

// Legacy resume routes (for backward compatibility)
app.post("/api/resumes", createResume);
app.get("/api/users/:userId/resumes", getUserResumes);
app.get("/api/resumes/:id", getResume);
app.put("/api/resumes/:id", updateResume);
app.delete("/api/resumes/:id", deleteResume);

// Protected routes (require Clerk authentication)
app.use("/api/protected", protectedRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📚 API docs available at http://localhost:${PORT}/api/ping`);
  console.log(`🔐 Protected routes at http://localhost:${PORT}/api/protected/*`);
  console.log(`🏥 Health check at http://localhost:${PORT}/health`);
});

export default app;
