import express from "express";
import { getAllStudents, getStudentById, createStudent, updateStudents, deleteStudent } from "../controllers/studentRoutes.js";
import { createTeacher, deleteTeacher, getAllteachers, getTeacherById, updateTeacher } from "../controllers/teacherRoutes.js";
import { attendanceData, getAllAttendance, getAttendanceDataByDate, getAttendanceDataByMonth, getAttendanceDataByYear, updateAttendance } from "../controllers/attendanceRoute.js";

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

//attendance Routes
router.get('/attendance', getAttendanceDataByDate); //http://localhost:8000/api/attendance?className=Class 4&date=2025-05-21
router.get('/attendance/monthly', getAttendanceDataByMonth);
router.get('/all-attendance', getAllAttendance);
router.post('/attendance', attendanceData);
router.put('/attendance/:id', updateAttendance); //PUT http://localhost:8000/api/attendance/1

// router.get('/attendance/yearly', getAttendanceDataByYear); //GET http://localhost:5000/api/attendance/yearly?className=Class 5&year=2025

 


export default router;
