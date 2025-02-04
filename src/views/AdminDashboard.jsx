/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import {
  Home,
  BarChart2,
  MessageCircle,
  LogOut,
  Moon,
  Sun,
  Menu,
  Search,
  Clock,
  Users,
  Star,
  UserRoundPen,
  MenuIcon,
} from "lucide-react";

const AdminDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Load dark mode and sidebar state from localStorage
    const savedMode = localStorage.getItem("mode");
    const savedSidebarStatus = localStorage.getItem("status");

    if (savedMode === "dark") setIsDarkMode(true);
    if (savedSidebarStatus === "close") setIsSidebarClosed(true);
  }, []);

  useEffect(() => {
    // Save dark mode state to localStorage
    localStorage.setItem("mode", isDarkMode ? "dark" : "light");
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    // Save sidebar state to localStorage
    localStorage.setItem("status", isSidebarClosed ? "close" : "open");
  }, [isSidebarClosed]);

  const activityData = [
    {
      name: "Opeyemi Tella",
      email: "opeyemitella@gmail.com",
      joined: "2022-02-12",
      type: "Boss",
      status: "Liked",
    },
    {
      name: "Kingsley Etekudo",
      email: "kingsleyetekudo@gmail.com",
      joined: "2022-02-12",
      type: "Full-Stack Developer",
      status: "Liked",
    },
    {
      name: "Adekunle Lekan",
      email: "adekunlelekan@gmail.com",
      joined: "2022-02-13",
      type: "Boss",
      status: "Liked",
    },
    {
      name: "Tijesunimi Michael",
      email: "tijesunimimichael@gmail.com",
      joined: "2022-02-13",
      type: "HR Manager",
      status: "Liked",
    },
    {
      name: "Anuoluwapo Babatunde",
      email: "anuoluwapobabatunde@gmail.com",
      joined: "2022-02-14",
      type: "Content Creator",
      status: "Liked",
    },
    {
      name: "Victor Busayo",
      email: "victorbusayo@gmail.com",
      joined: "2022-02-14",
      type: "Full-Stack Developer",
      status: "Liked",
    },
    {
      name: "Wisdom Chidi",
      email: "wisdomchidi@gmail.com",
      joined: "2022-02-15",
      type: "Content Creator",
      status: "Liked",
    },
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarClosed(!isSidebarClosed);
  };

  return (
    <div className={`${isDarkMode ? "dark" : ""} flex`}>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}
      {/* Sidebar Navigation */}
      <nav
        className={`
          fixed top-0 left-0 h-full w-[250px] p-4 bg-white 
          dark:bg-[#242526] border-r border-gray-200 
          dark:border-[#4D4C4C] transition-all duration-500
          ${isSidebarClosed ? "w-[63px]" : ""}
        `}
      >
        <div className="flex items-center">
          <div className="flex justify-center min-w-[45px]">
            <img
              src="src/assets/images/plexity-lg.png"
              alt="Logo"
              className="w-10 object-cover rounded-full"
            />
          </div>
          <span
            className={`
              text-1xl font-semibold ml-4 text-black 
              dark:text-gray-300 transition-all 
              ${isSidebarClosed ? "opacity-0 pointer-events-none" : ""}
            `}
          >
            PlexityDigital
          </span>
        </div>

        {/* Navigation Links */}
        <div className="mt-10 h-[calc(100%-90px)] flex flex-col justify-between">
          <ul>
            {[
              { icon: <Home />, name: "Dashboard" },
              { icon: <UserRoundPen />, name: "Profile" },
              { icon: <BarChart2 />, name: "Analytics" },
              { icon: <Users />, name: "Members" },
              { icon: <MessageCircle />, name: "Comment" },
              { icon: <Star />, name: "Total-Rating" },
            ].map((item, index) => (
              <li key={index} className="list-none mb-2">
                <a
                  href="#"
                  className="flex items-center h-12 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white"
                >
                  {React.cloneElement(item.icon, {
                    className: "w-6 h-6 mr-4 text-gray-500 dark:text-gray-400",
                  })}
                  <span
                    className={`
                      text-lg font-normal 
                      ${isSidebarClosed ? "opacity-0 pointer-events-none" : ""}
                    `}
                  >
                    {item.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Logout and Dark Mode Toggle */}
          <ul className="pt-4 border-t border-gray-200 dark:border-[#4D4C4C]">
            <li className="list-none mb-2">
              <a
                href="#"
                className="flex items-center h-12 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white"
              >
                <LogOut className="w-6 h-6 mr-4" />
                <span
                  className={`
                    text-lg font-normal 
                    ${isSidebarClosed ? "opacity-0 pointer-events-none" : ""}
                  `}
                >
                  Logout
                </span>
              </a>
            </li>
            <li className="list-none relative">
              <div
                onClick={toggleDarkMode}
                className="flex items-center cursor-pointer"
              >
                {isDarkMode ? (
                  <Sun className="w-6 h-6 mr-4 text-gray-500" />
                ) : (
                  <Moon className="w-6 h-6 mr-4 text-gray-500" />
                )}
                <span
                  className={`
                    text-lg font-normal 
                    ${isSidebarClosed ? "opacity-0 pointer-events-none" : ""}
                  `}
                >
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </span>
                <div
                  className={`
                    absolute right-4 w-10 h-6 rounded-full 
                    ${isDarkMode ? "bg-gray-600" : "bg-gray-300"}
                    flex items-center transition-all
                  `}
                >
                  <div
                    className={`
                      w-4 h-4 bg-white rounded-full 
                      transition-all transform 
                      ${
                        isDarkMode
                          ? "translate-x-[calc(100%-2px)]"
                          : "translate-x-1"
                      }
                    `}
                  ></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      {/* Dashboard Content */}
      <main
        className={`
          lg:ml-[250px] bg-white dark:bg-[#242526] 
          min-h-screen w-full lg:w-[calc(100%-250px)] p-4 
          transition-all duration-500
          ${isSidebarClosed ? "lg:ml-[73px] lg:w-[calc(100%-73px)]" : ""}
        `}
      >
        {/* Top Bar */}
        <div
          className={`
            fixed top-0 left-[250px] w-[calc(100%-250px)] 
            flex justify-between items-center p-4 
            bg-white dark:bg-[#242526] z-10
            transition-all duration-500
            ${isSidebarClosed ? "left-[73px] w-[calc(100%-73px)]" : ""}
          `}
        >
          <Menu
            onClick={toggleSidebar}
            className="text-2xl cursor-pointer text-black dark:text-white"
          />

          <div className="relative h-12 max-w-[600px] w-full mx-8">
            <input
              type="text"
              placeholder="Search here..."
              className="
                w-full h-full border border-gray-300 
                dark:border-[#4D4C4C] rounded-md 
                pl-12 pr-4 bg-white dark:bg-[#242526] 
                text-black dark:text-white
              "
            />
            <Search
              className="
                absolute left-4 top-1/2 -translate-y-1/2 
                text-gray-500 dark:text-gray-400
              "
            />
          </div>

          <img
            src="src/assets/images/Opeyemi_Tella.jpeg"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        </div>

        {/* Dashboard Content */}
        <div className="pt-16">
          {/* Overview Section */}
          <section>
            <div className="flex items-center my-16">
              <div
                className="
                  w-9 h-9 bg-blue-600 rounded-md 
                  flex items-center justify-center text-white
                "
              >
                <BarChart2 className="w-6 h-6" />
              </div>
              <span className="text-2xl font-medium ml-4 text-black dark:text-white">
                Dashboard
              </span>
            </div>

            <div className="flex justify-between flex-wrap">
              {[
                {
                  icon: <Users />,
                  text: "Total Members",
                  number: "50,120",
                  color: "bg-blue-400",
                },
                {
                  icon: <MessageCircle />,
                  text: "Total Appraisal",
                  number: "20,120",
                  color: "bg-yellow-200",
                },
                {
                  icon: <Star />,
                  text: "Total Rating",
                  number: "10,120",
                  color: "bg-purple-200",
                },
              ].map((box, index) => (
                <div
                  key={index}
                  className={`
                    w-[calc(33.33%-15px)] p-4 rounded-xl 
                    flex flex-col items-center ${box.color}
                  `}
                >
                  {React.cloneElement(box.icon, {
                    className: "w-9 h-9 text-black",
                  })}
                  <span className="text-lg font-medium text-black mt-2">
                    {box.text}
                  </span>
                  <span className="text-4xl font-medium text-black mt-2">
                    {box.number}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Activity Section */}
          <section className="mt-8">
            <div className="flex items-center mb-8">
              <div
                className="
                  w-9 h-9 bg-blue-600 rounded-md 
                  flex items-center justify-center text-white
                "
              >
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-2xl font-medium ml-4 text-black dark:text-white">
                Recent Registrations
              </span>
            </div>

            <div className="flex justify-between w-full overflow-x-auto">
              {[
                { title: "Name", data: activityData.map((d) => d.name) },
                { title: "Email", data: activityData.map((d) => d.email) },
                { title: "Joined", data: activityData.map((d) => d.joined) },
                { title: "Type", data: activityData.map((d) => d.type) },
                { title: "Status", data: activityData.map((d) => d.status) },
              ].map((column, index) => (
                <div key={index} className="flex flex-col mx-4">
                  <span className="text-xl font-medium text-black dark:text-white mb-4">
                    {column.title}
                  </span>
                  {column.data.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-lg font-normal mb-4 text-black dark:text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
