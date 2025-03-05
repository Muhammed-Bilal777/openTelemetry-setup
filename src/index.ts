import { instrumentationInitializetion } from "./instrumentation/instrumentaation";
instrumentationInitializetion();

import { Database } from "./config/database";
import userRoutes from "./routes/user.routes";
import dotev from "dotenv";
import express from "express";
dotev.config();

const app = express();
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
