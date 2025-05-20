import express from "express";
import { getAllStudents, getStudentById, createStudent, updateStudents, deleteStudent } from "../controllers/studentRoutes.js";
import { createTeacher, deleteTeacher, getAllteachers, getTeacherById, updateTeacher } from "../controllers/teacherRoutes.js";

const router = express.Router();

//Students Route
router.get("/students", getAllStudents);
router.get("/student/:id", getStudentById);
router.post('/student', createStudent);
router.put('/student/:id', updateStudents);
router.delete('/student/:id', deleteStudent);

//teachers Routes
router.get("/teachers", getAllteachers)
router.get("/teacher/:id", getTeacherById)
router.put("/teacher/:id", updateTeacher)
router.post('/teacher', createTeacher);
router.delete("/teacher/:id", deleteTeacher);




export default router;
