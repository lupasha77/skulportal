// frontend/src/pages/dashboard/Sidebar.jsx


import { Box, VStack, Button } from '@chakra-ui/react';

const Sidebar = ({ students, onSelectStudent }) => {
  return (
    <Box width="250px" bg="gray.100" p="4">
      <VStack spacing={3}>
        {students.map(student => (
          <Button
            key={student.id}
            onClick={() => onSelectStudent(student)}
            width="100%"
            variant="outline"
          >
            {student.name}
          </Button>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;