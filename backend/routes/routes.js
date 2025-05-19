import express from "express";
import { getAllStudents, getStudentById , createStudent} from "../controllers/studentRoutes.js";

const router = express.Router();

router.get("/students", getAllStudents);
router.get("/students/:id", getStudentById);


//POST
router.post('/students', createStudent);
export default router;
