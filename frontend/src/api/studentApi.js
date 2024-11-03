// frontend/src/api/studentApi.js

export const fetchStudentData = async (parentId) => {
    try {
      const response = await fetch(`/api/students/parent/${parentId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch student data');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching student data:', error);
      throw error;
    }
  };