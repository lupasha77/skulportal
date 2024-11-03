//auth-context.jsx 
import axios from 'axios'; // Make sure to import axios
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);  // Initialize loading as false

  useEffect(() => {
    // Check for existing auth data in localStorage
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
        console.log('Auth state restored:', { user: parsedUser, isAuthenticated: true });
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);


const register = async (formData) => {
  setLoading(true); // Start loading
  try {
    const response = await axios.post('http://localhost:5005/api/auth/register-user', formData);
    
    // Assuming the response contains user data and a token
    setUser(response.data.user);
    setIsAuthenticated(true);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));

    console.log('Registration successful:', response.data);
  } catch (error) {
    console.error('Registration error:', error);

    // Handle error properly
    if (error.response) {
      // If there's a response from the server
      throw new Error(error.response.data.message || 'Registration failed');
    } else {
      throw new Error('Network error, please try again later.');
    }
  } finally {
    setLoading(false); // End loading
  }
};
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('Auth state updated after login:', { user: userData, isAuthenticated: true });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('Auth state cleared');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
