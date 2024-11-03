import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon, EmailIcon } from '@chakra-ui/icons';
import { Box, Button, FormControl, FormLabel, Input, Select, Text, Grid, Heading, HStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

// Toast Container Component
const ToastContainer = () => (
  <Toaster
    position="top-right"
    reverseOrder={false}
    gutter={8}
    toastOptions={{
      duration: 5000,
      style: {
        background: '#363636',
        color: '#fff',
      },
      success: {
        duration: 3000,
        iconTheme: {
          primary: '#22c55e',
          secondary: '#fff',
        },
      },
      error: {
        duration: 4000,
        iconTheme: {
          primary: '#ef4444',
          secondary: '#fff',
        },
      },
    }}
  />
);

// Email Verification Alert Component
const EmailVerificationAlert = () => (
  <Box mb={6} p={4} bg="blue.50" borderRadius="lg" shadow="sm">
    <HStack spacing={3}>
      <EmailIcon boxSize={5} color="blue.400" />
      <Box>
        <Heading as="h3" size="sm" color="blue.800">Verify your email address</Heading>
        <Text mt={2} fontSize="sm" color="blue.700">
          Please check your inbox and click the verification link to activate your account.
        </Text>
      </Box>
    </HStack>
  </Box>
);

// Registration Success Component
const RegistrationSuccess = () => {
  const navigate = useNavigate();

  return (
    <Box minH="100vh" bg="gray.50" d="flex" flexDir="column" justifyContent="center" py={12} px={6}>
      <Box mt={8} mx="auto" w={{ base: 'full', sm: 'md' }}>
        <Box bg="white" py={8} px={4} shadow="sm" borderRadius="lg">
          <Box textAlign="center">
            <CheckCircleIcon boxSize={12} color="green.400" />
            <Heading mt={4} size="lg" color="gray.900">Registration Successful!</Heading>
            <Text mt={2} fontSize="sm" color="gray.600">Your account has been created successfully.</Text>
          </Box>

          <EmailVerificationAlert />

          <Button
            mt={6}
            onClick={() => navigate('/parent-dashboard')}
            w="full"
            colorScheme="blue"
          >
            Go to Dashboard
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
RegistrationForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

const RegistrationForm = ({ onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({
        role: 'parent', // default role
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        studentSpecificField: 'parentId',  // example for student-specific field
        staffSpecificField: 'staffNo',    // example for staff-specific field
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    // Function to check if the field is relevant to the role
    const renderRoleSpecificFields = () => {
      switch (formData.role) {
        case 'student':
          return (
            <FormControl isRequired>
              <FormLabel htmlFor="studentSpecificField">Student ID</FormLabel>
              <Input
                id="studentSpecificField"
                name="studentSpecificField"
                type="text"
                value={formData.studentSpecificField}
                onChange={handleChange}
                placeholder="Enter Student ID"
                variant="filled"
              />
            </FormControl>
          );
        case 'staff':
          return (
            <FormControl isRequired>
              <FormLabel htmlFor="staffSpecificField">Staff Department</FormLabel>
              <Input
                id="staffSpecificField"
                name="staffSpecificField"
                type="text"
                value={formData.staffSpecificField}
                onChange={handleChange}
                placeholder="Enter Staff Department"
                variant="filled"
              />
            </FormControl>
          );
        default:
          return null;
      }
    };
  
    const navigate = useNavigate();
  
    return (
      <Box minH="100vh" bg="gray.20" d="flex" flexDir="column" justifyContent={'space-between'} py={12} px={6}>
        <Box mx="auto" w={{ base: 'full', md: 'md', lg: 'container.lg' }} maxW="100%">
          <Heading mt={6} textAlign="center" size="xl" color="cyan">Create your account</Heading>
          
          <Box mt={8} bg="gray.600" py={8} px={4} shadow="sm" borderRadius="lg" textColor={'black'}>
            <form onSubmit={(e) => onSubmit(e, formData)}>
              <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
                {/* Common fields */}
                {[
                  { name: "email", label: "Email", type: "email", required: true },
                  { name: "firstName", label: "First Name", type: "text", required: true },
                  { name: "lastName", label: "Last Name", type: "text", required: true },
                  { name: "phone", label: "Phone", type: "tel", required: true },
                  { name: "address", label: "Address", type: "text", required: true },
                  { name: "password", label: "Password", type: "password", required: true },
                  { name: "confirmPassword", label: "Confirm Password", type: "password", required: true },
                ].map(field => (
                  <FormControl key={field.name} isRequired={field.required}>
                    <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.label}
                      variant="filled"
                    />
                  </FormControl>
                ))}
  
                {/* Role selection */}
                <FormControl isRequired>
                  <FormLabel htmlFor="role">Role</FormLabel>
                  <Select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    variant="filled"
                  >
                    <option value="parent">Parent</option>
                    <option value="student">Student</option>
                    <option value="staff">Staff</option>
                  </Select>
                </FormControl>
  
                {/* Role-specific fields */}
                {renderRoleSpecificFields()}
              </Grid>
  
              <HStack spacing={4} mt={6}>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  loadingText="Registering..."
                  colorScheme="blue"
                  flexGrow={1}
                >
                  Register
                </Button>
                <Button
                  variant="cancel"
                  onClick={() => navigate('/login')}
                  flexGrow={1}
                >
                  Cancel
                </Button>
              </HStack>
            </form>
          </Box>
        </Box>
      </Box>
    );
  };
  // Enhanced Dashboard Layout
const DashboardLayout = ({ children }) => (
    <Box minH="100vh" bg="gray.100">
      <Box as="nav" bg="white" shadow="sm">
        <Box maxW="7xl" mx="auto" px={{ base: 4, sm: 6, lg: 8 }}>
          <HStack justify="space-between" h={16}>
            {/* Add your navigation items here */}
          </HStack>
        </Box>
      </Box>
      
      <Box as="main" py={10}>
        <Box maxW="7xl" mx="auto" px={{ base: 4, sm: 6, lg: 8 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );

DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };

  export { 
    ToastContainer, 
    EmailVerificationAlert, 
    RegistrationSuccess, 
    RegistrationForm, 
    DashboardLayout 
  };