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
      <div className="header-area m-4 rounded-md">
        <UserDetails />
      </div>
      <div className={`sidebar-area  ${toggleBar ? "block" : "max-sm:hidden"}`}>
        <SideBar />
      </div>
      <div className=" mx-4 main-area ">
        <div>{/* <DashboardBox /> */}</div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
