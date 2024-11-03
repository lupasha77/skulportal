// backend/middleware/authMiddleware.js
import { verifyToken as jwtVerify } from '../utils/tokenHelper.js';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Middleware to verify token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // Check if Authorization header exists and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token using helper function
    const decoded = jwtVerify(token);
    
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Attach the decoded user data to request object
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Middleware to check role-based access
export const requireRole = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access forbidden: insufficient permissions' });
  }
  next();
};

// Combined protection middleware with token verification and user fetch
export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token using JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user by ID from the token and attach it to request object
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach user data to the request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Token validation error:', error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
