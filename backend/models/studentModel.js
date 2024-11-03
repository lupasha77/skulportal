// models/StudentModel.js
import { Schema, model } from 'mongoose';

const studentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'Parent',
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  grade: {
    type: Number,
    required: true
  },
  studentNumber: {
    type: String,
    required: true,
    unique: true
  },
  profilePicture: {
    type: String
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }],
  attendance: [{
    date: Date,
    status: String
  }],
  grades: [{
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    },
    grade: String,
    term: String
  }]
}, {
  timestamps: true
});

export default model('Student', studentSchema);