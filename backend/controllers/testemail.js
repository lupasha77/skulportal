import { createTransport } from 'nodemailer';
import { config } from 'dotenv';

// Load environment variables
config();

const transporter = createTransport({
  host: 'smtp.mailtrap.io',  // Correct Mailtrap host
  port: 2525,  // Correct Mailtrap port (you can also try 587)
  auth: {
    // user:'MAILTRAP_USER',  // Mailtrap username from your account MAILTRAP_USER=f9c85bf87ba817
    // pass:'MAILTRAP_PASS'   // Mailtrap password from your account MAILTRAP_PASS=e731b73ebd6512
    user:'f9c85bf87ba817',  // Mailtrap username from your account
    pass:'e731b73ebd6512'   // Mailtrap password from your account
  }
  

});
console.log('Mailtrap User Auth:', process.env.MAILTRAP_USER);
console.log('Mailtrap Pass:', process.env.MAILTRAP_PASS);

// Mail options
const mailOptions = {
  from: '"Hwange Technical school" <no-reply@hwangetechnical.com>',
  to: 'lmasvaya@gmail.com',  // Change this to the recipient's email address
  subject: 'Test Email from Mailtrap',
  text: 'Hello, this is a test email sent using Mailtrap and Nodemailer!',
};

// Send the email
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    return console.log('Error:', error);
  }
  console.log('Email sent:', info.messageId);
});
