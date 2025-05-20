import express from "express";
import { getAllStudents, getStudentById, createStudent, updateStudents, deleteStudent } from "../controllers/studentRoutes.js";
import { getAllteachers } from "../controllers/teacherRoutes.js";

const router = express.Router();

//Students Route
router.get("/students", getAllStudents);
router.get("/student/:id", getStudentById);
router.post('/student', createStudent);
router.put('/student/:id', updateStudents);
router.delete('/student/:id', deleteStudent);

//teachers Routes
router.get("/teachers", getAllteachers)





export default router;
