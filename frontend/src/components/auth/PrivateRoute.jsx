// src/components/auth/PrivateRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

import PropTypes from 'prop-types';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  console.log('PrivateRoute Debug:', {
    isAuthenticated,
    user,
    currentRole: user?.role,
    allowedRoles,
    currentPath: location.pathname
  });

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    console.log('Role not allowed, redirecting to default dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  console.log('Access granted to private route');
  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default PrivateRoute;