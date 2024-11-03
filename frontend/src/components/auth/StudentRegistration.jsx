import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Heading,
  Text,
  VStack,
  Alert,
  AlertIcon,
  Flex,
  Image,
  Center
} from '@chakra-ui/react';
import {  CheckCircle, Upload } from 'lucide-react';

const StudentRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    parentEmail: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    grade: '',
    profilePicture: null,
  });
  // eslint-disable-next-line no-unused-vars
  const [parentVerified, setParentVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  // Step 1: Parent Verification
  const handleParentVerification = async () => {
    setIsLoading(true);
    setError('');
  
    try {
      if (!formData.parentEmail) {
        setError("Please enter the parent's email address");
        setIsLoading(false);
        return;
      }
      console.log(formData.parentEmail);

      // Change fetch URL to include email in query string
      const response = await fetch(`http://localhost:5005/api/auth/verify-parentEmail?email=${formData.parentEmail}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
  
      const data = await response.json();
  
      console.log('Verification response:', data); // Debugging line
  
      if (response.ok && data.success) { // Assuming success field indicates successful verification
        setParentVerified(true);
        setCurrentStep(2);
      } else {
        setError(data.message || 'Parent verification failed');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to verify parent. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  
  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      setFormData((prev) => ({ ...prev, profilePicture: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await fetch('/api/auth/register-user', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentStep(4); // Success step
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
        console.log(err);
      setError('Failed to register student. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box minHeight="100vh" bg="blue.200" py={12} px={4} textColor={'blackAlpha.700'}>
      <Box maxWidth="md" mx="auto">
        {/* Progress Steps */}
        <Box mb={8}>
          <Flex justify="space-between">
            {[1, 2, 3].map((step) => (
              <Flex key={step} align="center">
                <Box
                  w={8}
                  h={8}
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg={currentStep >= step ? 'blue.700' : 'gray.400'}
                >
                  {currentStep > step ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Text>{step}</Text>
                  )}
                </Box>
                {step < 3 && (
                  <Box
                    h={1}
                    flexGrow={1}
                    bg={currentStep > step ? 'blue.800' : 'gray.400'}
                    ml={2}
                  />
                )}
              </Flex>
            ))}
          </Flex>
        </Box>

        {/* Error Display */}
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}

        {/* Step 1: Parent Verification */}
        {currentStep === 1 && (
          <Box bg="gray.500" p={6} rounded="lg" shadow="md">
            <Heading as="h2" size="lg" mb={6}>
              Parent Verification
            </Heading>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Parents Email</FormLabel>
                <Input
                  type="email"
                  value={formData.parentEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, parentEmail: e.target.value })
                  }
                />
              </FormControl>
              <Button
                onClick={handleParentVerification}
                isLoading={isLoading}
                colorScheme="blue"
                width="full"
              >
                Verify Parent
              </Button>
            </VStack>
          </Box>
        )}

        {/* Step 2: Student Details */}
        {currentStep === 2 && (
          <Box bg="white" p={6} rounded="lg" shadow="md">
            <Heading as="h2" size="lg" mb={6}>
              Student Information
            </Heading>
            <form>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      setFormData({ ...formData, dateOfBirth: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Grade</FormLabel>
                  <Select
                    value={formData.grade}
                    onChange={(e) =>
                      setFormData({ ...formData, grade: e.target.value })
                    }
                  >
                    <option value="">Select Grade</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8,10,11,12,"Form1","Form2","Form3","Form4","Form5","Form6"].map((grade) => (
                      <option key={grade} value={grade}>
                        Grade {grade}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <Flex justify="space-between" width="full">
                  <Button
                    onClick={() => setCurrentStep(1)}
                    colorScheme="gray"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(3)}
                    colorScheme="blue"
                  >
                    Next
                  </Button>
                </Flex>
              </VStack>
            </form>
          </Box>
        )}

        {/* Step 3: Profile Picture */}
        {currentStep === 3 && (
          <Box bg="white" p={6} rounded="lg" shadow="md">
            <Heading as="h2" size="lg" mb={6}>
              Profile Picture
            </Heading>
            <VStack spacing={4}>
              <Center
                borderWidth={2}
                borderStyle="dashed"
                borderColor="gray.300"
                borderRadius="lg"
                p={6}
              >
                {imagePreview ? (
                  <Box textAlign="center">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      boxSize="100px"
                      borderRadius="full"
                      objectFit="cover"
                    />
                    <Button
                      onClick={() => {
                        setImagePreview(null);
                        setFormData({ ...formData, profilePicture: null });
                      }}
                      colorScheme="red"
                      size="sm"
                      mt={2}
                    >
                      Remove
                    </Button>
                  </Box>
                ) : (
                  <Box textAlign="center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <Text mt={2}>
                      <label htmlFor="file-upload" style={{ cursor: 'pointer', color: 'blue.600' }}>
                        Upload a photo
                        <Input
                          id="file-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          display="none"
                        />
                      </label>
                    </Text>
                  </Box>
                )}
              </Center>
              <Flex justify="space-between" width="full">
                <Button
                  onClick={() => setCurrentStep(2)}
                  colorScheme="gray"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  isLoading={isLoading}
                  colorScheme="blue"
                >
                  Complete Registration
                </Button>
              </Flex>
            </VStack>
          </Box>
        )}

        {/* Step 4: Success */}
        {currentStep === 4 && (
          <Box bg="white" p={6} rounded="lg" shadow="md" textAlign="center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <Heading as="h2" size="lg" mt={4}>
              Registration Successful!
            </Heading>
            <Text mt={2}>
              Login credentials have been sent to the parents email address.
            </Text>
            <Button
              onClick={() => (window.location.href = '/login')}
              colorScheme="blue"
              mt={6}
              width="full"
            >
              Go to Login
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default StudentRegistration;