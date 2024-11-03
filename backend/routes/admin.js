
// Backend Admin Routes
// src/routes/admin.js
import { Router } from 'express';
const router = Router();
import { protect, adminOnly } from '../../frontend/src/middleware/auth';

// Get all users with parent details
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find()
      .populate('parent', 'firstName lastName email')
      .select('-password');
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update user
router.put('/users/:id', protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    Object.assign(user, req.body);
    await user.save();

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Profile Update Route
router.put('/users/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.body.currentPassword) {
      const isMatch = await user.matchPassword(req.body.currentPassword);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
      user.password = req.body.newPassword;
    }

    // Update other fields
    if (req.body.firstName) user.firstName = req.body.firstName;
    if (req.body.lastName) user.lastName = req.body.lastName;
    if (req.file) user.profilePicture = req.file.path;

    await user.save();

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
