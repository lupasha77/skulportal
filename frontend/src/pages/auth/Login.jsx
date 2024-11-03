// src/pages/auth/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { useAuth } from '../../context/useAuth';

const Login = () => {
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getDashboardPath = (role) => {
    console.log('Role received:', role);
    const dashboardPaths = {
      parent: '/parent-dashboard',
      student: '/student-dashboard',
      staff: '/staff-dashboard',
      default: '/dashboard'
    };
    const path = dashboardPaths[role.toLowerCase()] || dashboardPaths.default;
    console.log('Selected path:', path);
    return path;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const userData = await response.json();

      if (!response.ok) {
        throw new Error(userData.message || 'Login failed');
      }

      login(userData);
      
      toast({
        title: 'Login successful',
        description: `Welcome back${userData.firstName ? ', ' + userData.firstName : ''}!`,
        status: 'success',
        duration: 3000,
      });

      const dashboardPath = getDashboardPath(userData.role);
      console.log('Navigating to:', dashboardPath);
      navigate(dashboardPath, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login failed',
        description: error.message || 'Invalid credentials',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={8} maxWidth="500px" mx="auto">
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Heading>Login</Heading>
        
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          width="full"
          isLoading={loading}
        >
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;