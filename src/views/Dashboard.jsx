/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaHome, FaUser, FaCog, FaBars } from 'react-icons/fa';
import Sidebar from './Sidebar';
import Home from './Home';
import Profile from './Profile';
import Settings from './Settings';

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('Home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { name: 'Home', icon: FaHome },
    { name: 'Profile', icon: FaUser },
    { name: 'Settings', icon: FaCog },
  ];

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Home':
        return <Home />;
      case 'Profile':
        return <Profile />;
      case 'Settings':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        menuItems={menuItems}
        selectedComponent={selectedComponent}
        onSelect={setSelectedComponent}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden"
            >
              <FaBars className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">{selectedComponent}</h1>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {renderComponent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;