// frontend/src/pages/dashboard/ParentDashboard.jsx

// frontend/src/pages/dashboard/ParentPortal/DashboardParent.jsx

import { useEffect, useState } from 'react';
import { Box, Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { useAuth } from '../../../context/useAuth'; // Fixed import path
import { fetchStudentData } from '../../../api/studentApi'; // Adjusted path
import Sidebar from './Sidebar'; // Adjusted path
import PropTypes from 'prop-types';

const ParentDashboard = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const loadStudents = async () => {
      if (user && user._id) { // Add check for user existence
        try {
          const response = await fetchStudentData(user._id); // Using _id instead of parentId
          setStudents(response);
        } catch (error) {
          console.error('Error loading student data:', error);
          // You might want to add error handling UI here
        }
      }
    };

    loadStudents();
  }, [user]);

  return (
    <Flex>
      <Sidebar students={students} onSelectStudent={setSelectedStudent} />
      <Box flex="1" p="4">
        <Heading as="h1" mb="4">Parent Dashboard</Heading>
        {selectedStudent ? (
          <StudentDetails student={selectedStudent} />
        ) : (
          <Text>Select a student to see details.</Text>
        )}
      </Box>
    </Flex>
  );
};

const StudentDetails = ({ student }) => {
  return (
    <Box>
      <Heading as="h2">{student.name}</Heading>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Info</Tab>
          <Tab>Courses</Tab>
          <Tab>Marks</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Text>Age: {student.age}</Text>
            <Text>Email: {student.email}</Text>
            <Text>image: {student.image}</Text>
          </TabPanel>
          <TabPanel>
            <Text>Courses/Subjects</Text>
          </TabPanel>
          <TabPanel>
            <Text>Course Marks /Remarks</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

StudentDetails.propTypes = {
  student: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

export default ParentDashboard;