///authRoutes.js

import { Router } from 'express';
import {
     login , 
    registerUser,
    verifyEmail,
    verifyParentEmail,
    getAllUsers,
    getUserById,
    deleteUserByEmail,
   
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js'; // Import the middleware


//registerParent,verifyParent,registerStudent,
const router = Router();

router.post('/register-user', registerUser);
router.get('/verify-email', verifyEmail);
router.get('/verify-parentEmail', verifyParentEmail);
router.get('/getUserById', getUserById);
router.get('/getAllUsers', getAllUsers);

router.post('/login', login);

// Protected routes
router.delete('/deleteUserByEmail', protect, deleteUserByEmail); // Protect this route


export default router;
