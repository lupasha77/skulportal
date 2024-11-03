import express from 'express'; 
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import multer from 'multer';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authRoutes from './routes/authRoutes.js';
import parentRoutes from './routes/parentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import protectedRoutes from './routes/protected.js';
import studentRoutes from './routes/studentRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();
const app = express();

// File upload configuration
const upload = multer({ dest: 'uploads/' });

// Middleware configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Frontend URLs
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Connect to MongoDB
connectDB();

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per window
});
app.use(limiter);

// Logging middleware to capture incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Validate routes middleware
const validateRoutes = (req, res, next) => {
  const fullPath = req.baseUrl + req.path;
  const method = req.method;
  
  console.log('Validating route:', { fullPath, method });
  
  // List of valid routes
  const validRoutes = [
    { path: '/', method: 'GET' },
    { path: '/api/auth/getAllUsers', method: 'GET' },
    { path: '/api/auth/getUserById', method: 'GET' },
    { path: '/api/auth/verify-email', method: 'GET' },
    { path: '/api/auth/register-user', method: 'POST' },
    { path: '/api/auth/register-parent', method: 'POST' },
    { path: '/api/auth/register-student', method: 'POST' },
    { path: '/api/auth/login', method: 'POST' },
    { path: '/api/auth/verify-parentEmail', method: 'GET' },
    { path: '/api/auth/deleteUser', method: 'DELETE' },
    { path: '/api/students/parent/:parentId', method: 'GET' },
  ];
  
  const isValidRoute = validRoutes.some(r => 
    fullPath === r.path && method === r.method
  );
  
  if (!isValidRoute) {
    console.warn(`Invalid route accessed: ${method} ${fullPath}`);
    return res.status(404).json({
      status: 'error',
      message: `Route ${method} ${fullPath} not found`,
      validRoutes: validRoutes.map(r => `${r.method} ${r.path}`)
    });
  }
  
  next();
};

// Apply validateRoutes middleware for all /api routes
app.use('/api', validateRoutes);

// Routes
app.use('/', authRoutes)
app.use('/api/auth', authRoutes); // Register authentication routes
app.use('/api/users', userRoutes); // Register user-related routes
app.use('/api/parents', parentRoutes); // Register parent-related routes
app.use('/api/students', studentRoutes); // Register student-related routes
app.use('/api', protectedRoutes); // Register protected routes

// Simple route to confirm server is running
app.get('/', (req, res) => {
  res.send('Backend server is running, Makeke!!!!!!!!!!!!!!!!');
});

// Error Handler Middleware
const enhancedErrorHandler = (err, req, res, next) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });
  
  if (err.name === 'NotFoundError') {
    return res.status(404).json({
      status: 'error',
      message: 'Resource not found',
      path: req.path
    });
  }
  
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal server error',
    path: req.path
  });
};
app.use(errorHandler); // Use enhanced error handler

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
