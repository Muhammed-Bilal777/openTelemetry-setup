import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export class Database {
  private uri: string;

  constructor() {
    this.uri = process.env.MONGO_URI || "";
  }

  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.uri);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Database connection error:", error);
      process.exit(1);
    }
  }
}
