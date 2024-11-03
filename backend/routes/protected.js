// routes/protected.js
import express from 'express';
import { body } from 'express-validator';
import { verifyToken, requireRole, roles } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

// Protected routes with role-based access
router.get('/admin/dashboard', 
  verifyToken, 
  requireRole(roles.ADMIN), 
  (req, res) => {
    res.json({ message: 'Admin dashboard' });
});

router.get('/user/profile',
  verifyToken,
  requireRole(roles.USER, roles.ADMIN),
  (req, res) => {
    res.json({ message: 'User profile' });
});


router.post('/user',
  validate([
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('role').isIn(Object.values(roles)),
  ]),
  (req, res) => {
    // Handle user creation
    res.status(201).json({ message: 'User created successfully' });
});

export default router;