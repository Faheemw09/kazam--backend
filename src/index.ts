import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connection } from "./config/db";
import userRoutes from "./routes/auth";
import taskRoutes from "./routes/task";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/tasks", taskRoutes);
const Port = process.env.PORT as string;
app.listen(Port, async () => {
  console.log(`backend is running ${Port}`);
  try {
    await connection;
    console.log("server is connected to database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
});
