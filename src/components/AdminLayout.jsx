// src/components/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';

function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminHeader />
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;