import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthProvider';

const ProtectedRoute = ({ children }) => {
  const { isAdminLoggedIn, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  if (!isAdminLoggedIn) {
    // Redirect them to the admin login page, but save the current location they were trying to go to.
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;