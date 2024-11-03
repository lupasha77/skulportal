// utils/generateStudentNo.js
import moment from 'moment';

export const generateStudentNo = async () => {
  const year = moment().format('YYYY');
  const lastStudent = await Student.findOne().sort({ createdAt: -1 }); // Assuming you have a Student model
  const serial = lastStudent ? parseInt(lastStudent.studentNumber.slice(-4)) + 1 : 1; // Increment or start at 0001
  return `H${year}${String(serial).padStart(4, '0')}`; // Format: H[YYYY]0001
};
