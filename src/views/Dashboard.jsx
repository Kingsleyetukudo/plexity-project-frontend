import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import UserDetails from "../components/userDetails";
import SideBar from "../components/sideBar";
import { Outlet } from "react-router-dom";
import { getAllUsers, getUserById } from "../stores/userStateStore";
import { getAllAppraisal } from "../stores/appraisalStore";
import { getAppraisalByUser } from "../stores/staffAppraisalStore";
import { updateUser } from "../stores/userStateStore";
import {
  fetchCommentsByCurrentUser,
  fetchComments,
} from "../stores/commentStore";
import StaffBiodataForm from "../components/StaffBiodataForm";

const Dashboard = () => {
  const { toggleBar, status, user } = useSelector((state) => state.auth);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

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
      console.warn("User details not found! Redirecting to login...");
      navigate("/login"); // Redirect to login page if no user found
    }
  }, [dispatch, status, navigate]);

  useEffect(() => {
    console.log("it okay");
    // if (user?.profileCompleted === true) {
    // }
    setShowProfileModal(false);
    dispatch(getUserById(user._id));
  }, [dispatch, status, user]);

  useEffect(() => {
    if (user?.profileCompleted === false) {
      setShowProfileModal(true); // Ensure modal stays open if profile is incomplete
    }
  }, [user]);

  const onSubmit = async (formData) => {
    console.log(formData);
    const result = await dispatch(
      updateUser({ userId: user._id, userData: formData })
    );
    dispatch(getUserById(user._id));
    if (result.message === "User updated successfully") {
      setShowProfileModal(false); // Close modal only if profile is successfully updated & completed
    }
  };

  return (
    <div
      className={`grid-layout grid-rows-[auto_1fr_auto] md:grid-cols-[200px_1fr] transition-grid-cols duration-300 ease-in-out ${
        toggleBar ? "md:grid-cols-[200px_1fr]" : "grid-cols-[0px_1fr]"
      }`}
    >
      <div className="header-area my-3 mb-5 md:m-4 z-10 sticky top-1 md:top-4 bg-white">
        <UserDetails />
      </div>
      <div
        className={`sidebar-area sticky top-0 ${
          toggleBar ? "block" : "max-sm:hidden"
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
          <p className="text-gray-400">© 2021 Plexity. All rights reserved</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
