import { Router } from 'express';
import {
    getParentById,
    updateParentById,
    getParentByEmail,
} from '../controllers/parentController.js';

const router = Router();

router.get('/:id', getParentById);
router.put('/:id', updateParentById);
router.get('/by-email/:email', getParentByEmail);

export default router;