import express from "express";
import { getAllStudents, getStudentById } from "../controllers/studentController.js";

const router = express.Router();

router.get("/students", getAllStudents);
router.get("/students/:id", getStudentById);

export default router;
