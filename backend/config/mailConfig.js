import { createTransport } from 'nodemailer';

// Create a transporter object with your email provider's details
const transporter = createTransport({
  host: 'smtp.mailtrap.io',  // Correct Mailtrap host
  port: 2525,  // Correct Mailtrap port (you can also try 587) // Example using Gmail, but can be any service (Outlook, Yahoo, etc.)
  auth: {
    // user: 'f9c85bf87ba817', // Set in your environment variables MAILTRAP_USER='f9c85bf87ba817'
    
    // pass: 'e731b73ebd6512', // Set in your environment variables MAILTRAP_PASS='e731b73ebd6512'
    user: process.env.MAILTRAP_USER, // Set in your environment variables MAILTRAP_USER='f9c85bf87ba817'

    pass: process.env.MAILTRAP_PASS, // Set in your environment variables MAILTRAP_PASS='e731b73ebd6512'
  },
  
  
});
// console.log('Mailtrap User mailConfig:', process.env.MAILTRAP_USER);
// console.log('Mailtrap Pass:', process.env.MAILTRAP_PASS);

export default transporter;

