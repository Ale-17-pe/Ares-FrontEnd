import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function AdminRoute() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    // Si hay un usuario y su rol es 'ADMIN', permite el acceso.
    if (usuario && usuario.role === 'ADMIN') {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
}

export default AdminRoute;