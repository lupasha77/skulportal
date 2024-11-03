import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import {
  Box,
  Button,
  Flex,
  Stack,
  HStack,
  useColorMode,
  useColorModeValue,
  Menu as ChakraMenu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'teal');
  const isDarkTheme = colorMode === 'dark';

  return (
    <Box bg={bgColor} px={4} width="100%">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>Logo</Box>
        <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
        </HStack>
        <Flex alignItems="center">
          <Button colorScheme='red' variant={'solid'} p={5} margin={5}>
            <Link to="/login">Login</Link>
          </Button>

          {/* Updated Register Button with Dropdown Menu */}
          <ChakraMenu>
            <MenuButton as={Button} colorScheme='cyan' variant={'solid'} p={5} margin={5}>
              Register
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link to="/register/parent">Parent</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/register/student">Student</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/register/staff">Staff</Link>
              </MenuItem>
            </MenuList>
          </ChakraMenu>

          <Button onClick={toggleColorMode}>
            {isDarkTheme ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
          <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </Button>
        </Flex>
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            <Button colorScheme="blue">
              <Link to="/">Home</Link>
            </Button>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/dashboard">Dashboard</Link>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default NavBar;