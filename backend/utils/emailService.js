// Email Verification Service
// /utils/emailService.js
import dotenv from 'dotenv';
import { createTransport } from 'nodemailer';
import jwt from 'jsonwebtoken'; // Correct import statement

dotenv.config();
const transporter = createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,   //MAILTRAP_USER='f9c85bf87ba817'

    pass: process.env.MAILTRAP_PASS,  //MAILTRAP_PASS='e731b73ebd6512'
  },
});

export const sendVerificationEmail = async (user, verificationToken) => {
  console.log('User details for verification email:', user);
  
  if (!user || !user.email) {
      console.error('Invalid user or user email not defined');
      throw new Error('Cannot send email, user email is not defined');
  }

  const url = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;
  
  const mailOptions = {
    from: {
      name: 'Hwange Tech School',
      address: process.env.EMAIL_USER
    },
      to: user.email,
      subject: 'Verify Your Email Address',
      html: `
        <h1>Welcome to our platform!</h1>
        <p>Please click the link below to verify your email address:</p>
        <a href="${url}">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
      `,
  };

  // console.log('Mail options before sending:', mailOptions);

  // Send the email
  return await transporter.sendMail(mailOptions);
};





// // Function to send verification email
// export const sendVerificationEmail = async (user) => {
//   // Create the verification token
//   const verificationToken = jwt.sign(  // Use `jwt.sign` directly
//     { id: user._id },
//     process.env.EMAIL_SECRET,
//     { expiresIn: '24h' }
//   );
  
//   console.log('User details for verification email:', user);
//   const url = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;

//   // Define mail options
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: user.email,
    
//     subject: 'Verify Your Email Address',
//     html: `
//       <h1>Welcome to our platform!</h1>
//       <p>Please click the link below to verify your email address:</p>
//       <a href="${url}">Verify Email</a>
//       <p>This link will expire in 24 hours.</p>
//     `,
//   };

