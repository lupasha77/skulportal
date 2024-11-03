// frontend/src/utils/validationSchemas.js
import * as yup from 'yup';

export const parentRegistrationSchema = yup.object({
  email: yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  firstName: yup.string()
    .required('First name is required'),
  lastName: yup.string()
    .required('Last name is required'),
  phone: yup.string()
    .matches(/^\+?[\d\s-]{10,}$/, 'Invalid phone number')
    .required('Phone number is required'),
  address: yup.object({
    street: yup.string().required('Street address is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    zipCode: yup.string().required('ZIP code is required')
  })
});

export const studentRegistrationSchema = yup.object({
  email: yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  firstName: yup.string()
    .required('First name is required'),
  lastName: yup.string()
    .required('Last name is required'),
  dateOfBirth: yup.date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .required('Date of birth is required'),
  grade: yup.string()
    .required('Grade is required'),
  parentId: yup.string()
    .required('Parent ID is required')
});