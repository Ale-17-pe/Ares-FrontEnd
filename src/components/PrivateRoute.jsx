import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const usuario = localStorage.getItem('usuario');
  return usuario ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
