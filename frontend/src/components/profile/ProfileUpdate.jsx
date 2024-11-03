
// Profile Update Component
// src/components/profile/ProfileUpdate.jsx
const ProfileUpdate = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      profilePicture: null
    });
    const [imagePreview, setImagePreview] = useState(null);
    const toast = useToast();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
        toast({
          title: 'Error',
          description: 'New passwords do not match',
          status: 'error',
          duration: 3000,
        });
        return;
      }
  
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });
  
      try {
        const response = await fetch('/api/users/profile', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: formDataToSend
        });
  
        const data = await response.json();
  
        if (response.ok) {
          toast({
            title: 'Success',
            description: 'Profile updated successfully',
            status: 'success',
            duration: 3000,
          });
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 3000,
        });
      }
    };
  
    return (
      <Box maxW="md" mx="auto" mt={8}>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <Text fontSize="2xl" fontWeight="bold">Update Profile</Text>
            
            {/* Form fields similar to registration with current values */}
            {/* Add image preview and upload functionality */}
            
            <Button type="submit" colorScheme="blue" width="full">
              Update Profile
            </Button>
          </VStack>
        </form>
      </Box>
    );
  };