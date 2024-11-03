// controllers/studentController.js
import { findOne } from '../models/Student';

const getStudentProfile = async (req, res) => {
  try {
    const student = await findOne({ userId: req.user._id })
      .populate('courses')
      .populate('parentId', 'firstName lastName email');

    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStudentProfile = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const student = await findOne({ userId: req.user._id });

    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    if (firstName) student.firstName = firstName;
    if (lastName) student.lastName = lastName;

    await student.save();
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getStudentGrades = async (req, res) => {
  try {
    const student = await findOne({ userId: req.user._id })
      .populate({
        path: 'grades.course',
        select: 'name code'
      });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student.grades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudentAttendance = async (req, res) => {
  try {
    const student = await findOne({ userId: req.user._id });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student.attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudentCourses = async (req, res) => {
  try {
    const student = await findOne({ userId: req.user._id })
      .populate('courses');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student.courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getStudentProfile,
  updateStudentProfile,
  getStudentGrades,
  getStudentAttendance,
  getStudentCourses
};