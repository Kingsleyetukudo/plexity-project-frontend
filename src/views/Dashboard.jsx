import { useSelector, useDispatch } from "react-redux";
// import { useState } from "react";
import UserDetails from "../components/userDetails";
import SideBar from "../components/sideBar";
import { Outlet } from "react-router-dom";
import { getAllUsers } from "../stores/userStateStore";
import { getAllAppraisal } from "../stores/appraisalStore";
import { getAppraisalByUser } from "../stores/staffAppraisalStore";
import {
  fetchCommentsByCurrentUser,
  fetchComments,
} from "../stores/commentStore";
import { useEffect } from "react";
// import DashboardBox from "../components/dashboradBox";

const Dashboard = () => {
  const { toggleBar, status } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user exists in localStorage and parse it
    const storedUser = localStorage.getItem("persist:auth");
    let userDetails = null;
    if (storedUser) {
      try {
        userDetails = JSON.parse(JSON.parse(storedUser).user);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    // Check if userDetails is available before dispatching
    if (userDetails && userDetails._id) {
      console.log(userDetails._id); // Now this should work fine

      if (status === "idle") {
        dispatch(getAllUsers());
        dispatch(getAllAppraisal());
        dispatch(fetchCommentsByCurrentUser(userDetails._id));
        dispatch(fetchComments());
      }
      dispatch(getAppraisalByUser(userDetails._id));
    } else {
      console.warn("User details not found!");
    }
  }, [dispatch, status]);

  return (
    <div
      className={`grid-layout  grid-rows-[auto_1fr_auto]  md:grid-cols-[200px_1fr] transition-grid-cols duration-300 ease-in-out ${
        toggleBar ? "md:grid-cols-[200px_1fr]" : "grid-cols-[0px_1fr]"
      }`}
    >
      <div className="header-area my-3 mb-5 md:m-4 z-10 sticky top-1 md:top-4 bg-white ">
        <UserDetails />
      </div>
      <div
        className={`sidebar-area sticky top-0  ${
          toggleBar ? "block" : "max-sm:hidden"
        }`}
      >
        <SideBar />
      </div>
      <div className="  mx-2 md:mx-4 pb-8 main-area ">
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
