import { useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { RegistrationForm, RegistrationSuccess } from '../../components/auth-enhancement';
import PropTypes from 'prop-types';

const Register = () => {
  const { register, loading } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (e, formData) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData); // Log form data

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await register(formData);
      setIsRegistered(true);
      console.log("Registered;", formData)
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
      alert(errorMessage);
    }
  };

  if (isRegistered) {
    return <RegistrationSuccess />;
  }

  return <RegistrationForm onSubmit={handleSubmit} isLoading={loading} />;
};
RegistrationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired, // keep it required if you will always pass it
};
export default Register;