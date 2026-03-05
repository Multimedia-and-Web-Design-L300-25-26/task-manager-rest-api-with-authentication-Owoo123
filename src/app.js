import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import connectDB from "./config/db.js";

// Load environment variables. When running tests, NODE_ENV is set to "test" by jest
dotenv.config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });

// connect to database as soon as the app module is imported
connectDB();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;