import { Router } from 'express';
import {
    getStudentById,
    getStudentByNumber,
    updateStudentById,
    updateStudentByNumber,
    getParentByStudentNumber,
} from '../controllers/studentController.js';

const router = Router();

router.get('/:id', getStudentById);
router.get('/number/:studentNumber', getStudentByNumber);
router.put('/:id', updateStudentById);
router.put('/number/:studentNumber', updateStudentByNumber);
router.get('/get-parent/:studentNumber', getParentByStudentNumber);

export default router;