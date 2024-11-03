// routes/studentRoutes.js
import { Router } from 'express';
const router = Router();
import { protect, studentOnly } from '../middleware/auth';
import { getStudentProfile, updateStudentProfile, getStudentGrades, getStudentAttendance, getStudentCourses } from '../controllers/studentController';

router.use(protect, studentOnly);

router.get('/profile', getStudentProfile);
router.put('/profile', updateStudentProfile);
router.get('/grades', getStudentGrades);
router.get('/attendance', getStudentAttendance);
router.get('/courses', getStudentCourses);

export default router;