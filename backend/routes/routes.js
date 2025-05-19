import express from "express";
import { getAllStudents, getStudentById , createStudent, updateStudents, deleteStudent} from "../controllers/studentRoutes.js";

const router = express.Router();

//Students Route
router.get("/students", getAllStudents);
router.get("/student/:id", getStudentById);
router.post('/student', createStudent);
router.put('/student/:id', updateStudents);
router.delete('/student/:id', deleteStudent);

export default router;
