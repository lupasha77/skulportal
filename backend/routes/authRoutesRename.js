// backend/routes/auth.js
import { Router } from 'express';
import multer, { diskStorage } from 'multer';
import { extname as _extname } from 'path';
import jwt from 'jsonwebtoken'; // Assuming you might need jwt for token generation
// import {User} from '../models/userModel'; // Adjust the path as per your project structure
// import { protect } from '../middleware/auth'; // Adjust accordingly if you're using a middleware for protection

const router = Router();

// Configure multer for file upload
const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profiles/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(_extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// Verify Parent Email
router.post('/verify-parent', async (req, res) => {
  try {
    const { parentEmail } = req.body;
    const parent = await User.findOne({ 
      email: parentEmail,
      role: 'parent'
    });

    if (!parent) {
      return res.status(404).json({ 
        message: 'Parent not found. Please ensure the parent is registered first.' 
      });
    }

    res.json({ 
      message: 'Parent verified successfully',
      parentId: parent._id
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Student Registration with Image Upload
router.post('/register/student', upload.single('profilePicture'), async (req, res) => {
  try {
    const { firstName, lastName, email, password, parentEmail } = req.body;

    // Verify if student email already exists
    const studentExists = await User.findOne({ email });
    if (studentExists) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    // Verify parent again
    const parent = await User.findOne({ 
      email: parentEmail,
      role: 'parent'
    });

    if (!parent) {
      return res.status(404).json({ 
        message: 'Parent not found. Please ensure the parent is registered first.' 
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Profile picture is required' });
    }

    const profilePicturePath = req.file.path;

    const student = await User.create({
      firstName,
      lastName,
      email,
      password,
      role: 'student',
      parent: parent._id,
      profilePicture: profilePicturePath
    });

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(201).json({
      _id: student._id,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      role: student.role,
      parent: student.parent,
      profilePicture: student.profilePicture,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get Student Profile with Parent Info
router.get('/student/:id', protect, async (req, res) => {
  try {
    const student = await User.findById(req.params.id)
      .populate('parent', 'firstName lastName email')
      .select('-password');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Export the router
export default router;