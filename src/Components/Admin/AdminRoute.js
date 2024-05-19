import React from 'react';
import { Navigate } from 'react-router-dom';

function AdminRoute({ element }) {
  const isAdmin = localStorage.getItem('userRole') === 'ADMIN';
  return isAdmin ? element : <Navigate to="/" />;
}

export default AdminRoute;
