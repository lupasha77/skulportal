
// import { useState } from 'react';
// import useAuth  from '../../context/useAuth';
// import { RegistrationForm, RegistrationSuccess } from '../../components/auth-enhancement';
// import PropTypes from 'prop-types';

// const Register = () => {
//   const { register, loading } = useAuth();
//   const [isRegistered, setIsRegistered] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = {
//       // gather your form data from the RegistrationForm component using refs or handleChange
//     };

//     try {
//       await register(formData);
//       setIsRegistered(true);
//     } catch (error) {
//       console.error(error);
//       // Error handling should adequately be here, if there's any specific logic needed
//     }
//   };

//   if (isRegistered) {
//     return <RegistrationSuccess />;
//   }

//   return <RegistrationForm onSubmit={handleSubmit} isLoading={loading} />;
// };

// // Adding prop types validation for the RegistrationForm component
// RegistrationForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
//   isLoading: PropTypes.bool.isRequired,
// };

// export default Register;

// // Register.jsx
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/auth-context';
// import { ROLE_SPECIFIC_FIELDS, ROLES } from '../../constants/auth';
// import { RegistrationForm, RegistrationSuccess } from '../components/auth-enhancement';


// const Register = () => {
//   const navigate = useNavigate();
//   const { register, loading } = useAuth();
//   const [isRegistered, setIsRegistered] = useState(false);

//   const [formData, setFormData] = useState({
    // email: '',
    // password: '',
    // confirmPassword: '',
    // role: ROLES.PARENT,
    // firstName: '',
    // lastName: '',
    // phone: '',
    // address: '',
//   });

//   const [formError, setFormError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const validateForm = () => {
//     if (!formData.email || !formData.password || !formData.confirmPassword) {
//       setFormError('All fields are required');
//       return false;
//     }
//     if (formData.password !== formData.confirmPassword) {
//       setFormError('Passwords do not match');
//       return false;
//     }
//     if (formData.password.length < 6) {
//       setFormError('Password must be at least 6 characters');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       await register({
//         //your form data here
//       })
//      // Create a new object without the confirmPassword field
//      // eslint-disable-next-line no-unused-vars
//      const { confirmPassword, ...registrationData } = formData;
//      const response = await register(registrationData);
     
      
//       // Navigate to role-specific dashboard
//       navigate(`/${formData.role}-dashboard`);
      
//       return response;
//     } catch (err) {
//       setFormError(err.message || 'Registration failed');
//     }
//   };

//   const renderField = (fieldName, type = 'text', required = true) => (
//     <div key={fieldName} className="mb-4">
//       <label className="block text-gray-700 text-sm font-bold mb-2">
//         {fieldName.split(/(?=[A-Z])/).join(' ')}
//       </label>
//       <input
//         type={type}
//         name={fieldName}
//         value={formData[fieldName] || ''}
//         onChange={handleChange}
//         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         required={required}
//       />
//     </div>
//   );

//   const renderRoleSpecificFields = () => {
//     const fields = ROLE_SPECIFIC_FIELDS[formData.role] || [];
//     return fields.map(field => renderField(field));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Create your account
//           </h2>
//         </div>
        
//         <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//           {formError && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//               {formError}
//             </div>
//           )}

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Role
//             </label>
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             >
//               {Object.entries(ROLES).map(([key, value]) => (
//                 <option key={key} value={value}>
//                   {key.charAt(0) + key.slice(1).toLowerCase()}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {renderField('email', 'email')}
//           {renderField('firstName')}
//           {renderField('lastName')}
//           {renderRoleSpecificFields()}
//           {renderField('password', 'password')}
//           {renderField('confirmPassword', 'password')}

//           <button
//             type="submit"
//             disabled={loading}
//             className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             {loading ? 'Registering...' : 'Register'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;





// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import  useAuth  from '../../context/useAuth';
// // import { useAuth } from './hooks/useAuth';

// const Register = () => {
//   const navigate = useNavigate();
//   const { register, loading } = useAuth();
  
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: 'parent', // default role
//     firstName: '',
//     lastName: '',
//     phone: '',
//     address: ''
//   });

//   const [formError, setFormError] = useState('');

//   // Additional fields based on role
//   const roleSpecificFields = {
//     student: ['grade', 'dateOfBirth', 'parentId'],
//     staff: ['position', 'department', 'employeeId'],
//     parent: ['phone', 'address']
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const validateForm = () => {
//     if (formData.password !== formData.confirmPassword) {
//       setFormError('Passwords do not match');
//       return false;
//     }
//     if (formData.password.length < 6) {
//       setFormError('Password must be at least 6 characters');
//       return false;
//     }
//     setFormError('');
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       const response = await register(formData);
//       console.log('Registration successful:', response);
      
//       // Redirect based on role
//       switch (formData.role) {
//         case 'parent':
//           navigate('/parent-dashboard');
//           break;
//         case 'student':
//           navigate('/student-dashboard');
//           break;
//         case 'staff':
//           navigate('/staff-dashboard');
//           break;
//         default:
//           navigate('/dashboard');
//       }
//     } catch (err) {
//       console.error('Registration error:', err);
//       setFormError(err.message || 'Registration failed');
//     }
//   };

//   const renderRoleSpecificFields = () => {
//     const fields = roleSpecificFields[formData.role] || [];
//     return fields.map(field => (
//       <div key={field} className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//           {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
//         </label>
//         <input
//           type={field.includes('date') ? 'date' : 'text'}
//           name={field}
//           onChange={handleChange}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           required
//         />
//       </div>
//     ));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Create your account
//           </h2>
//         </div>
        
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {formError && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//               {formError}
//             </div>
//           )}

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Role
//             </label>
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             >
//               <option value="parent">Parent</option>
//               <option value="student">Student</option>
//               <option value="staff">Staff</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               First Name
//             </label>
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Last Name
//             </label>
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>

//           {renderRoleSpecificFields()}

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             {loading ? 'Registering...' : 'Register'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;



To implement this system, you'll need to:

Create an 'uploads/profiles' directory in your project
Install multer: npm install multer
Ensure your express app serves static files:

javascriptCopy
app.use('/uploads', express.static('uploads'));









I've added comprehensive user management features including:

Email Verification System:

Nodemailer integration for sending verification emails
Verification token generation and validation
Email verification status tracking
24-hour token expiration


Admin Dashboard:

User listing with filtering and search
User management interface
Parent-student relationship management
User status monitoring
Role-based access control


Profile Update System:

Personal information updates
Password change functionality
Profile picture update
Form validation and error handling


Additional Features:

Admin middleware for protected routes
Enhanced user schema with verification status
Last login tracking
Improved error handling
Role-based access control



To implement these features, you'll need to:

Install additional dependencies:
To implement these features, you'll need to:

Install additional dependencies:

bashCopynpm install nodemailer

Set up environment variables:

envCopyEMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
EMAIL_SECRET=your-email-jwt-secret
FRONTEND_URL=http://your-frontend-url











I've added three major feature sets:

Activity Logging System:

Detailed user activity tracking
IP address and user agent logging
Activity categorization
Comprehensive logging middleware
Activity visualization in admin dashboard


Password Recovery System:

Secure token generation
Email-based recovery process
Time-limited reset tokens
Activity logging integration
User notification system


Analytics Dashboard:

Real-time user statistics
Growth tracking
Parent-student ratio monitoring
User verification rates
Activity patterns visualization
Customizable time frames
Interactive charts and graphs



To implement these features, you'll need to:

Install additional dependencies:

bashCopy

Update your environment variables:

envCopyANALYTICS_RETENTION_DAYS=90

Create necessary indexes for performance:

javascriptCopyactivityLogSchema.index({ timestamp: -1 });
activityLogSchema.index({ user: 1, timestamp: -1 });
Would you like me to:
