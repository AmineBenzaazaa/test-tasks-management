import express from "express";
import {
  createTask,
  getTasksByUser,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", verifyToken, getTasksByUser);
router.post("/create", verifyToken, createTask);
router.post("/update/:id", verifyToken, updateTask);
router.delete("/delete/:id", verifyToken, deleteTask);

export default router;
