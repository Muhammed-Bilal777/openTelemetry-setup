import { Router } from "express";
import UserController from "../controllers/user.controller";
import { trace } from "@opentelemetry/api";

const router = Router();
const userController = new UserController();

router.post("/register", userController.register); // No binding needed
router.get("/test", (req, res) => {
  console.log("Test route hitted");

  res.json({ message: "Test route hitted" });
});
export default router;
