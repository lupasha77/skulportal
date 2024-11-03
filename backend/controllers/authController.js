import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createTransport } from 'nodemailer';
import bcrypt from 'bcryptjs'; // Kept as it is used in password hashing
import User from '../models/userModel.js';
import Parent from '../models/parentModel.js';
import Student from '../models/studentModel.js';
import { generateToken } from '../utils/tokenHelper.js';
import {sendVerificationEmail} from '../utils/emailService.js'; // Example email helper
import { generateStudentNo } from '../utils/generateStudentNo.js'; // Import the utility function


dotenv.config(); // Load environment variables

// Configure the mail transporter
const transporter = createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

export const registerUser = async (req, res) => {
  try {
    const { email, password, confirmPassword, role, firstName, lastName, phone, address, dateOfBirth, grade } = req.body;

    // Validate passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user (hashed password is handled in the user model)
    const newUser = new User({ email, password, role, isVerified: false });
    await newUser.save();

    // Generate verification token
    const verificationToken = generateToken(newUser);
    await sendVerificationEmail({ email: newUser.email, _id: newUser._id }, verificationToken);

    if (role === 'parent') {
      // Create parent record
      await Parent.create({
        userId: newUser._id,
        firstName,
        lastName,
        phone,
        address,
      });
    }

    // Check if the user is a student and register them
    if (role === 'student') {
      const studentNo = await generateStudentNo(); // Generate the student number
      const studentEmail = `H${studentNo}@schoolname.org`; // Create student email

      // Set initial password as full name or send a default one to parent email
      const initialPassword = `${firstName}${lastName}`; // Set initial password
      await transporter.sendMail({
        from: process.env.MAILTRAP_USER,
        to: address.email, // Parent email
        subject: 'Your Child\'s Account Details',
        text: `Your child's initial password is: ${initialPassword}. They will need to reset this upon first login.`,
      });

      // Create student record
      const student = new Student({
        userId: newUser._id,
        parentId:  /* Get parent ID from the database based on email or other logic */
        firstName,
        lastName,
        dateOfBirth,
        grade,
        studentNumber: studentNo,
      });

      await student.save();
      // Optionally, push the student reference to the parent's students array
      await Parent.findByIdAndUpdate(student.parentId, { $push: { students: student._id } });

      return res.status(200).json({ message: 'Student registration successful! An email has been sent to the parent.' });
    }

    res.status(200).json({ message: 'Registration successful! Please check your email for verification.' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};


// Email Verification
export const verifyEmail = async (req, res) => {
  const token = req.query.token;
  console.log('Token received:', token); // Verify token is received

  if (!token) {
    return res.status(400).send('No token provided.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // Log the decoded token
    const user = await User.findById(decoded.id);
    console.log('User found:', user);
    
    if (!user) {
      console.log('User not found');
      return res.status(404).send('User not found.');
    }

    user.isVerified = true;
    await user.save();

    // Optional: Role-based logic can be added here if needed
    res.send('Email successfully verified! You can now log in.');
  } catch (error) {
    console.error(error);
    res.status(400).send('Invalid verification link.');
  }
};



// Login User
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(403).json({ message: 'Please verify your email before logging in.' });
    }

    // Generate JWT token
    const token = generateToken(user);
    res.status(200).json({
      _id: user._id,
      email: user.email,
      role: user.role,
      token,
    });

    // Note: Redirect logic should be handled on the client-side
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};
export const verifyParentEmail = async (req, res) => {
  const { email } = req.query;
  console.log('Verifying parent email, ' + email);

  // Validate email
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Check if a user with the given email exists
    const user = await User.findOne({ email });

    // If user does not exist
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has the 'parent' role
    if (user.role === 'parent') {
      return res.status(200).json({ success: true, message: 'Parent email verified.' });
    } else {
      return res.status(403).json({ message: 'The user is not a parent' });
    }
  } catch (error) {
    console.error('Error verifying parent email:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// 1. Get all users
export const getAllUsers= async (req, res) => {
  console.log("Getting all users...");
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// 2. Delete user by email
export const deleteUserByEmail=async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

// 3. Get user by ID
export const getUserById=async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
};


