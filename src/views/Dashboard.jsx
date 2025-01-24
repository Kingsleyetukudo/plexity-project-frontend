<<<<<<< HEAD
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
=======
import { useSelector, useDispatch } from "react-redux";
// import { useState } from "react";
import UserDetails from "../components/userDetails";
import SideBar from "../components/sideBar";
import { Outlet } from "react-router-dom";
import { getAllUsers } from "../stores/userStateStore";
import { getAllAppraisal } from "../stores/appraisalStore";
import { useEffect } from "react";
// import DashboardBox from "../components/dashboradBox";

const Dashboard = () => {
  const { users, toggleBar, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllUsers());
      dispatch(getAllAppraisal());
    }
  }, [dispatch, status]);

  console.log(users);
  return (
    <div
      className={`grid-layout  grid-rows-[auto_1fr_auto]  md:grid-cols-[270px_1fr] transition-grid-cols duration-300 ease-in-out ${
        toggleBar ? "md:grid-cols-[270px_1fr]" : "grid-cols-[0px_1fr]"
      }`}
    >
      <div className="header-area my-3 mb-5 md:m-4 sticky top-1 md:top-4 bg-white ">
        <UserDetails />
      </div>
      <div
        className={`sidebar-area sticky top-0  ${
          toggleBar ? "block" : "max-sm:hidden"
        }`}
      >
        <SideBar />
      </div>
      <div className=" mx-2 md:mx-4 pb-8 main-area">
        <Outlet />
>>>>>>> 7587e633837fa2291bb77d096fb19ad237df9565
      </div>
    </div>
  );
};

export default Dashboard;