// components/admin/Dashboard.jsx
import { useState, useEffect,useCallback } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import UserEditForm from './UserEditForm'; // Import UserEditForm component

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  },[toast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    onOpen();
  };

  const handleUpdateUser = async (userData) => {
    try {
      const response = await fetch(`/api/admin/users/${userData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) throw new Error('Failed to update user');
      toast({
        title: 'Success',
        description: 'User updated successfully',
        status: 'success',
        duration: 3000,
      });
      fetchUsers();
      onClose();
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
    <Box p={8}>
      <Text fontSize="2xl" mb={4}>User Management Dashboard</Text>
      
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Verified</Th>
            <Th>Parent</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map(user => (
            <Tr key={user._id}>
              <Td>{user.firstName} {user.lastName}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td>{user.isVerified ? 'Yes' : 'No'}</Td>
              <Td>{user.parent ? `${user.parent.firstName} ${user.parent.lastName}` : '-'}</Td>
              <Td>
                <Button size="sm" onClick={() => handleEditUser(user)}>
                  Edit
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UserEditForm user={selectedUser} onSubmit={handleUpdateUser} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminDashboard;