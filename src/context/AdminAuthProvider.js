import React, { useState, useEffect, useContext } from 'react';
import AdminAuthContext from './AdminAuthContext';
import { BACKEND_URL } from '../config';

const AdminAuthProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAdminLoggedIn = !!adminToken;

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setAdminToken(token);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await fetch(`${BACKEND_URL}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      setAdminToken(data.token);
      localStorage.setItem('adminToken', data.token);
    } else {
      throw new Error(data.message || 'Login failed');
    }
  };

  const logout = () => {
    setAdminToken(null);
    localStorage.removeItem('adminToken');
  };

  const value = {
    adminToken,
    isAdminLoggedIn,
    loading,
    login,
    logout,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export default AdminAuthProvider;
