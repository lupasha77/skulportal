// utils/studentUtils.js
export const generateStudentNumber = (currentYear, count) => {
    return `H${currentYear}${(count + 1).toString().padStart(4, '0')}`;
  };
  
  export const generateTemporaryPassword = () => {
    const length = 10;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  };