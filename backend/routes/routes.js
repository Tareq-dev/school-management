import express from "express";
import { addSalaryIncrement, createEmployee, deleteEmployee, getAllEmployees, getEmployeeById, getEmployeeDetails, updateEmployee } from "../controllers/employee_management/employeeController.js";
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
import { createStudentRegistration, deleteStudentRegistration, getAllStudentRegistrations, getStudentRegistrationById, updateStudentRegistration } from "../controllers/student_management/studentRegistration.js";
import { assignRolls, getStudentsForRoll } from "../controllers/student_management/roll_generate.js";
import {  generateSlip,  getStudentsDataForFees } from "../controllers/student_management/generate_fee_slip.js";
import { upload } from "../config/upload.js";

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

//Students Registration
router.get("/students", getAllStudentRegistrations);
router.get("/student/:id", getStudentRegistrationById);
router.post('/students',upload.single("photo"), createStudentRegistration);
router.put('/student/:id',upload.single("photo"), updateStudentRegistration);
router.delete('/student/:id', deleteStudentRegistration);

//Roll Assing
router.get('/roll-generate',getStudentsForRoll)
router.post('/roll-assign',assignRolls)

//Generate Fees and Slip
router.get('/get-fee',getStudentsDataForFees)
router.get('/generate-slip/:id',generateSlip)

 
//teachers Routes
router.get("/employees", getAllEmployees)
router.get("/employee/:id", getEmployeeById)
router.put("/employee/:id",upload.single("photo"), updateEmployee)
router.post('/employee', upload.single("photo"), createEmployee);
router.delete("/employee/:id", deleteEmployee);

//attendance Routes
router.get('/attendance', getAttendanceDataByDate); //http://localhost:8000/api/attendance?className=Class 4&date=2025-05-21
router.get('/attendance/monthly', getAttendanceDataByMonth);
router.get('/all-attendance', getAllAttendance);
router.post('/attendance', attendanceData);
router.put('/attendance/:id', updateAttendance); //PUT http://localhost:8000/api/attendance/1

// router.get('/attendance/yearly', getAttendanceDataByYear); //GET http://localhost:5000/api/attendance/yearly?className=Class 5&year=2025

router.get('/get-employee-details', getEmployeeDetails);
router.post('/increment-employee', addSalaryIncrement);

export default router;
