import express from "express";
import { getAllStudents, getStudentById, createStudent, updateStudents, deleteStudent } from "../controllers/studentRoutes.js";
import { createTeacher, deleteTeacher, getAllteachers, getTeacherById, updateTeacher } from "../controllers/teacherRoutes.js";
import { attendanceData, getAllAttendance, getAttendanceDataByDate, getAttendanceDataByMonth, getAttendanceDataByYear, updateAttendance } from "../controllers/attendanceRoute.js";
import { getAllClasses, getClassById, addClass, updateClass, deleteClass } from "../controllers/setup_controllers/classController.js";
import { addSession, deleteSession, getAllSession, getSessionById, updateSession } from "../controllers/setup_controllers/sessionController.js";
import { addGroup, deleteGroup, getAllGroup, getGroupById, updateGroup } from "../controllers/setup_controllers/groupController.js";
import { addExam, deleteExam, getAllExam, getExamById, updateExam } from "../controllers/setup_controllers/examTypeController.js";
import { addShift, deleteShift, getAllShift, getShiftById, updateShift } from "../controllers/setup_controllers/shiftController.js";
import { addSubject, deleteSubject, getAllSubject, getSubjectById, updateSubject } from "../controllers/setup_controllers/subjectController.js";
import { addFee_Categoty, deleteFee_Categoty, getAllFee_Categoty, getFee_CategotyById, updateFee_Categoty } from "../controllers/setup_controllers/feeCategoryController.js";
import { createFeeAmount, deleteFeeAmount, getFeeAmountById, getFeeAmounts, updateFeeAmount } from "../controllers/setup_controllers/feeAmountController.js";
import { assignSubject, getAllAssignments, updateAssignment } from "../controllers/setup_controllers/subjectAssignController.js";

const router = express.Router();

//Class
router.get('/classes', getAllClasses);
router.post('/classes', addClass);
router.get('/classes/:id', getClassById);
router.put('/classes/:id', updateClass);
router.delete('/classes/:id', deleteClass);

//Session
router.get('/session', getAllSession);
router.post('/session', addSession);
router.get('/session/:id', getSessionById);
router.put('/session/:id', updateSession);
router.delete('/session/:id', deleteSession);

//Group
router.get('/group', getAllGroup);
router.post('/group', addGroup);
router.get('/group/:id', getGroupById);
router.put('/group/:id', updateGroup);
router.delete('/group/:id', deleteGroup);

//Exam
router.get('/exam', getAllExam);
router.post('/exam', addExam);
router.get('/exam/:id', getExamById);
router.put('/exam/:id', updateExam);
router.delete('/exam/:id', deleteExam);

//Shift
router.get('/shift', getAllShift);
router.post('/shift', addShift);
router.get('/shift/:id', getShiftById);
router.put('/shift/:id', updateShift);
router.delete('/shift/:id', deleteShift);

//Subject
router.get('/subject', getAllSubject);
router.post('/subject', addSubject);
router.get('/subject/:id', getSubjectById);
router.put('/subject/:id', updateSubject);
router.delete('/subject/:id', deleteSubject);

//Fee_Categoty
router.get('/fee_categories', getAllFee_Categoty);
router.post('/fee_categories', addFee_Categoty);
router.get('/fee_categories/:id', getFee_CategotyById);
router.put('/fee_categories/:id', updateFee_Categoty);
router.delete('/fee_categories/:id', deleteFee_Categoty);

// Fee Amount
router.post('/fee-amounts', createFeeAmount);
router.get('/fee-amounts', getFeeAmounts);
router.get('/fee-amounts/:id', getFeeAmountById);
router.put('/fee-amounts/:id', updateFeeAmount);
router.delete('/fee-amounts/:id', deleteFeeAmount);


// Subjcet Assign
router.get('/subject-assignments', getAllAssignments);
router.post('/subject-assignments', assignSubject);
router.put('/subject-assignments/:id', updateAssignment);



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
