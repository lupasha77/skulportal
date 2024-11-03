// src/services/authService.js (or src/hooks/useAuth.js if using React)
import axios from 'axios';

// API configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Authentication service class
class AuthService {
  // Login method
  async login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password
      });

      console.log('Login Response:', response.data);

      // Validate response data
      if (!response.data || !response.data.token) {
        throw new Error('Invalid response format: Missing token');
      }

      // Check for required user details
      if (!response.data.firstName || !response.data.lastName) {
        console.warn('Missing required user details in response');
      }

      // If login successful, store user data
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      throw error;
    }
  }

  // Logout method
  logout() {
    localStorage.removeItem('user');
  }

  // Get current user data
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  // Check if user is logged in
  isLoggedIn() {
    const user = this.getCurrentUser();
    return !!user?.token;
  }
}

export const authService = new AuthService();

// If using React, you might want to create a hook:
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const userData = await authService.login(email, password);
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  useEffect(() => {
    // Check for existing user session
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  return {
    user,
    loading,
    error,
    login: handleLogin,
    logout: handleLogout,
    isLoggedIn: authService.isLoggedIn()
  };
};