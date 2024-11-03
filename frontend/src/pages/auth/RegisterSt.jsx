// src/pages/Register.jsx
import { useState } from 'react';
import { RegistrationForm, RegistrationSuccess } from '../../components/registrationForm';
import { useAuth } from '../../context/useAuth';

const RegisterSt = () => {
  const { register, loading } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (e, formData) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await register(formData);
      setIsRegistered(true);
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again.");
    }
  };

  if (isRegistered) {
    return <RegistrationSuccess />;
  }

  return <RegistrationForm onSubmit={handleSubmit} isLoading={loading} />;
};

export default RegisterSt;
