// DashboardLayout.tsx (Optional)
import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout: React.FC = () => {
  return (
    <div>
      
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
