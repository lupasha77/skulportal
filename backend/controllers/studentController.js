import Student from "../models/studentModel.js";
import Parent from '../models/parentModel.js';

// Get a student by ID
export const getStudentById = async (req, res) => {
    const studentId = req.params.id;
    try {
        const student = await Student.findById(studentId).populate('parentId');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a student by student number
export const getStudentByNumber = async (req, res) => {
    const { studentNumber } = req.params;
    try {
        const student = await Student.findOne({ studentNumber }).populate('parentId');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a student by ID
export const updateStudentById = async (req, res) => {
    const studentId = req.params.id;
    const updateData = req.body;

    try {
        const student = await Student.findByIdAndUpdate(studentId, updateData, { new: true });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a student by student number
export const updateStudentByNumber = async (req, res) => {
    const { studentNumber } = req.params;
    const updateData = req.body;

    try {
        const student = await Student.findOneAndUpdate({ studentNumber }, updateData, { new: true });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a parent by student number
export const getParentByStudentNumber = async (req, res) => {
    const { studentNumber } = req.params;
    try {
        const student = await Student.findOne({ studentNumber }).populate('parentId');
        if (!student || !student.parentId) {
            return res.status(404).json({ message: 'Parent not found' });
        }
        res.status(200).json(student.parentId);
    } catch (error) {
        console.error('Error fetching parent:', error);
        res.status(500).json({ message: 'Server error' });
    }
};