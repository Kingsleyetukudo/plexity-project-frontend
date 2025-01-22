import { useSelector } from "react-redux";
// import { useState } from "react";
import UserDetails from "../components/userDetails";
import SideBar from "../components/sideBar";
import { Outlet } from "react-router-dom";
// import DashboardBox from "../components/dashboradBox";

const Dashboard = () => {
  const { user, token, toggleBar } = useSelector((state) => state.auth);

  console.log(user.firstName, token);
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
      </div>
    </div>
  );
};

export default Dashboard;
