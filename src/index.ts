// import { instrumentationInitializetion } from "./instrumentation/instrumentaation";
// instrumentationInitializetion();

import logger from "./logs";
import { setupMetrics } from "./metrics";
import { setupTracing } from "./tracing";
import { Database } from "./config/database";
import userRoutes from "./routes/user.routes";
import dotev from "dotenv";
import express from "express";
dotev.config();
const tracer = setupTracing();
const app = express();
setupMetrics(app);
const port = process.env.PORT || 3000;

app.use(express.json());

// Database connection
const db = new Database();
db.connect();

// Routes
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
