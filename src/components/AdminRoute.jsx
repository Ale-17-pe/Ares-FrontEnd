import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function AdminRoute() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (usuario && usuario.role === 'ADMIN') {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default AdminRoute;