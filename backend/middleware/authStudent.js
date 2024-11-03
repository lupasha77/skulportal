// middleware/auth.js
import { verify } from 'jsonwebtoken';
import { findById } from '../models/User';

const protect = async (req, res, next) => {
  try {
    if (!req.headers.authorization?.startsWith('Bearer')) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const decoded = verify(token, process.env.JWT_SECRET);
    
    req.user = await findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
};

const studentOnly = (req, res, next) => {
  if (req.user && req.user.role === 'student') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
};

export default { protect, studentOnly };