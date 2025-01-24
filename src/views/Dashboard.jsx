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
      <div className=" mx-2 md:mx-4 pb-8 main-area ">
        <Outlet />
      </div>
      <div className="footer-area">
        <footer className="bg-white p-4 text-center">
          <p className="text-gray-400">© 2021 Plexity. All rights reserved</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
