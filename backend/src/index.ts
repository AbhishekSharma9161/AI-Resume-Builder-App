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
import {
  createCheckoutSession,
  handleWebhook,
  getUserSubscription,
  cancelSubscription,
  resumeSubscription,
} from "./routes/payments.js";

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
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Example API routes
app.get("/api/ping", (_req, res) => {
  const ping = process.env.PING_MESSAGE ?? "Backend server is running!";
  res.json({ message: ping });
});

app.get("/api/demo", handleDemo);

// User routes
app.post("/api/users", createUser);
app.get("/api/users/email/:email", getUserByEmail);
app.get("/api/users/:id", getUser);

// Resume routes
app.post("/api/resumes", createResume);
app.get("/api/users/:userId/resumes", getUserResumes);
app.get("/api/resumes/:id", getResume);
app.put("/api/resumes/:id", updateResume);
app.delete("/api/resumes/:id", deleteResume);

// Payment routes
app.post("/api/payments/create-checkout-session", createCheckoutSession);
app.post("/api/payments/webhook", handleWebhook);
app.get("/api/users/:userId/subscription", getUserSubscription);
app.post("/api/subscriptions/:subscriptionId/cancel", cancelSubscription);
app.post("/api/subscriptions/:subscriptionId/resume", resumeSubscription);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📚 API docs available at http://localhost:${PORT}/api/ping`);
});

export default app;
