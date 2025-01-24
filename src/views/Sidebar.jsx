/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Sidebar = ({ menuItems, selectedComponent, onSelect, isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
        }`}
      >
        <div className="flex items-center justify-between flex-shrink-0 p-4">
          <span className="text-lg font-semibold text-white">Dashboard</span>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-white lg:hidden"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-5">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href="#"
              className={`flex items-center px-6 py-2 mt-4 text-gray-100 ${
                selectedComponent === item.name
                  ? 'bg-gray-700 bg-opacity-25 text-gray-100'
                  : 'hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100'
              }`}
              onClick={() => {
                onSelect(item.name);
                onClose();
              }}
            >
              <item.icon className="w-6 h-6" />
              <span className="mx-3">{item.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;