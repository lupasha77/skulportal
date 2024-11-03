import  { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  Select,
  FormErrorMessage,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  useSteps,
} from '@chakra-ui/react';
import axios from 'axios';

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    parentEmail: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    grade: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isParentVerified, setIsParentVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const steps = [
    { title: 'Parent Verification', description: 'Verify parent email' },
    { title: 'Student Details', description: 'Enter student information' },
    { title: 'Review', description: 'Review and submit' }
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  {isParentVerified && renderStudentForm()}

  const validateParentEmail = async () => {
    if (!formData.parentEmail) {
      setErrors({ ...errors, parentEmail: 'Parent email is required' });
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(`/api/auth/verify-parentEmail?email=${formData.parentEmail}`);
      
      if (response.data.success) {
        setIsParentVerified(true);
        setActiveStep(1);
        toast({
          title: 'Parent Verified',
          description: 'You can now proceed with student registration',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Verification Failed',
        description: error.response?.data?.message || 'Parent email verification failed',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.grade) newErrors.grade = 'Grade is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const response = await axios.post('/api/auth/register-user', {
        email: formData.parentEmail,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        grade: formData.grade,
        role: 'student'
      });
      console.log(response);

      toast({
        title: 'Registration Successful',
        description: 'Student has been registered successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Reset form and state
      setFormData({
        parentEmail: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        grade: '',
      });
      setIsParentVerified(false);
      setActiveStep(0);
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: error.response?.data?.message || 'An error occurred during registration',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const renderParentVerification = () => (
    <FormControl isInvalid={!!errors.parentEmail}>
      <FormLabel>Parent Email</FormLabel>
      <Input
        type="email"
        name="parentEmail"
        value={formData.parentEmail}
        onChange={handleChange}
        placeholder="Enter parent's email"
      />
      <FormErrorMessage>{errors.parentEmail}</FormErrorMessage>
      <Button
        mt={4}
        colorScheme="blue"
        onClick={validateParentEmail}
        isLoading={isLoading}
      >
        Verify Parent
      </Button>
    </FormControl>
  );

  const renderStudentForm = () => (
    <VStack spacing={4} align="stretch">
      <FormControl isInvalid={!!errors.firstName}>
        <FormLabel>First Name</FormLabel>
        <Input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <FormErrorMessage>{errors.firstName}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.lastName}>
        <FormLabel>Last Name</FormLabel>
        <Input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <FormErrorMessage>{errors.lastName}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.dateOfBirth}>
        <FormLabel>Date of Birth</FormLabel>
        <Input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
        <FormErrorMessage>{errors.dateOfBirth}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.grade}>
        <FormLabel>Grade</FormLabel>
        <Select
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          placeholder="Select grade"
        >
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Grade {i + 1}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{errors.grade}</FormErrorMessage>
      </FormControl>
    </VStack>
  );

  const renderReview = () => (
    <VStack spacing={4} align="stretch">
      <Text fontWeight="bold">Review Information</Text>
      <Text>Parent Email: {formData.parentEmail}</Text>
      <Text>Student Name: {formData.firstName} {formData.lastName}</Text>
      <Text>Date of Birth: {formData.dateOfBirth}</Text>
      <Text>Grade: {formData.grade}</Text>
    </VStack>
  );

  return (
    <Box maxW="600px" mx="auto" p={6}>
      <Stepper index={activeStep} mb={8}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Box flexShrink='0'>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <form onSubmit={handleSubmit}>
        {activeStep === 0 && renderParentVerification()}
        {activeStep === 1 && renderStudentForm()}
        {activeStep === 2 && renderReview()}

        {activeStep > 0 && (
          <Button
            mt={4}
            mr={4}
            onClick={() => setActiveStep(prev => prev - 1)}
          >
            Previous
          </Button>
        )}

        {activeStep === 1 && (
          <Button
            mt={4}
            colorScheme="blue"
            onClick={() => {
              if (validateForm()) setActiveStep(2);
            }}
          >
            Next
          </Button>
        )}

        {activeStep === 2 && (
          <Button
            mt={4}
            colorScheme="green"
            type="submit"
            isLoading={isLoading}
          >
            Submit Registration
          </Button>
        )}
      </form>
    </Box>
  );
};

export default StudentRegistration;