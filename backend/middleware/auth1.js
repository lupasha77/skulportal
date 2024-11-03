// Backend Route Protection Middleware
// src/middleware/auth.js
import { verify } from 'jsonwebtoken';

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Admin Middleware
// src/middleware/auth.js
const adminOnly = async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
};

// Update User Schema
// src/models/User.js
const userSchema = new mongoose.Schema({
  // ... previous fields ...
  isVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['admin', 'parent', 'student'],
    required: true
  },
  lastLogin: {
    type: Date
  }
});