// src/layouts/DashboardLayout.jsx
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add your sidebar, header, etc. here */}
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;