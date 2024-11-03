// // routes/userRoutes.js
import { Router } from 'express';
import User from '../models/userModel.js';
import Parent from '../models/parentModel.js';
// import Student from '../models/studentModel.js';
import {requireRole } from '../middleware/authMiddleware.js';

const router = Router();

// Public routes
router.post('/check-email', async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    res.json({ exists: !!existingUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Protected routes
router.get('/profile', requireRole, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    let profile;
    
    if (user.role === 'parent') {
      profile = await Parent.findOne({ userId: user._id }).populate('students');
    } else if (user.role === 'student') {
      profile = await Student.findOne({ userId: user._id }).populate('parentId');
    }
    
    res.json({ user, profile });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Admin routes
router.get('/all', requireRole, async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;