import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/auth/PrivateRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
// import RegisterSt from './pages/auth/RegisterSt';
import Dashboard from './pages/dashboard/Dashboard';
import HomePage from './pages/homepage/HomePage';
import { AuthProvider } from './context/auth-context.jsx';
import theme from './theme';
import { ToastContainer } from './components/auth-enhancement';
import ParentDashboard from './pages/dashboard/ParentPortal/DashboardParent';
import StudentRegistration from './components/auth/StudentRegistration';
import VerifyEmail from './components/admin/VerifyEmail';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Box minH="100vh">
            <Navbar />
            <Routes>
              <Route path="/verify/:token" element={<VerifyEmail />} /> {/* Updated to 'element' */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register/parent" element={<Register />} />
              {/* <Route path="/register-parent/" element={<RegisterSt />} /> */}
              <Route path="/register/student" element={<StudentRegistration />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/parent-dashboard"
                element={
                  <PrivateRoute allowedRoles={['parent']}>
                    <ParentDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/student-dashboard"
                element={
                  <PrivateRoute allowedRoles={['student']}>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/staff-dashboard"
                element={
                  <PrivateRoute allowedRoles={['staff']}>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Box>
          <ToastContainer />
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;