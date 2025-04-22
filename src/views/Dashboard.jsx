import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import UserDetails from "../components/userDetails";
import SideBar from "../components/sideBar";
import { Outlet } from "react-router-dom";
import { getAllUsers, getUserById, updateUser } from "../stores/userStateStore";
import { getAllAppraisal } from "../stores/appraisalStore";
import { getAppraisalByUser } from "../stores/staffAppraisalStore";
import {
  fetchCommentsByCurrentUser,
  fetchComments,
} from "../stores/commentStore";
import StaffBiodataForm from "../components/StaffBiodataForm";
import { usePageToggle } from "../components/ToggleSettings";

const Dashboard = () => {
  const { status, user } = useSelector((state) => state.auth);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSideBarOpen, toggleSideBar } = usePageToggle();

  // useEffect(() => {
  //   const handleResize = () => {
  //     const isLargeScreen = window.innerWidth >= 768;
  //     dispatch({ type: "SET_TOGGLEBAR", payload: isLargeScreen });
  //   };

  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, [dispatch]);

  useEffect(() => {
    const storedUser = localStorage.getItem("persist:auth");
    let userDetails = null;

    if (storedUser) {
      try {
        userDetails = JSON.parse(JSON.parse(storedUser).user);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    if (userDetails && userDetails._id) {
      // console.log(userDetails._id);

      if (status === "idle") {
        dispatch(getAllUsers());
        dispatch(getAllAppraisal());
        dispatch(fetchCommentsByCurrentUser(userDetails._id));
        dispatch(fetchComments());
      }
    } else {
      console.warn("User details not found! Redirecting to login...");
      navigate("/login");
    }
  }, [dispatch, status, navigate]);

  useEffect(() => {
    dispatch(getUserById(user._id));
    dispatch(getAppraisalByUser(user._id));
    dispatch(getAllAppraisal);
  }, [dispatch, status, user]);

  // useEffect(() => {
  //   if (user?.profileCompleted === false) {
  //     setShowProfileModal(true);
  //   }
  // }, [user]);

  // Poll for profile updates every 5 seconds
  useEffect(() => {
    if (user?.profileCompleted === false) {
      setShowProfileModal(true); // Open the modal if profile is incomplete

      const interval = setInterval(() => {
        // console.log(user);
        dispatch(getUserById(user._id));
      }, 5000);

      return () => clearInterval(interval);
    } else {
      setShowProfileModal(false); // Close modal when profile is completed
    }
  }, [dispatch, user?.profileCompleted, user?._id, user]);

  const onSubmit = async (formData) => {
    const result = await dispatch(
      updateUser({ userId: user._id, userData: formData })
    );
    // console.log(result);

    if (result.message === "User updated successfully") {
      dispatch(getUserById(user._id)); // Refresh user data
    }
  };

  // Close modal automatically when profile is completed
  useEffect(() => {
    if (user?.profileCompleted) {
      // console.log("checking...");
      setShowProfileModal(false);
    }
  }, [user]);

  return (
    <div
      className={`grid-layout h-screen grid-rows-[auto_1fr_auto] transition-all duration-300 ease-in-out ${
        isSideBarOpen ? "md:grid-cols-[200px_1fr]" : "grid-cols-[0px_1fr]"
      }`}
    >
      <div className="header-area my-3 mb-5 md:m-4 z-30 sticky top-1 md:top-4 bg-white">
        <UserDetails toggleSideBar={toggleSideBar} />
      </div>
      <div
        className={`sidebar-area sticky top-0 transition-all duration-300 ease-in-out ${
          isSideBarOpen ? "w-[200px]" : "w-0 max-sm:hidden"
        }`}
      >
        <SideBar />
      </div>
      <div className="mx-2 md:mx-4 pb-8 main-area">
        <Outlet />
        {showProfileModal && (
          <StaffBiodataForm
            setShowProfileModal={setShowProfileModal}
            onSubmit={onSubmit}
          />
        )}
      </div>
      <div className="footer-area">
        <footer className="bg-white p-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Plexity. All rights reserved
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
