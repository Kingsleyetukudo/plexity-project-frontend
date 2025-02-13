import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../stores/userStateStore";
import Logo from "../assets/images/plexityLogo.png";
import {
  LayoutDashboard,
  UserRoundPen,
  Star,
  LogOut,
  UsersRound,
  MessageSquareText,
  BriefcaseBusiness,
  HandCoins,
  FileText,
} from "lucide-react";
import { useEffect, useState } from "react";

const SideBar = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("persist:auth");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userDetails = user?.user ? JSON.parse(user.user) : null;
    setCurrentUser(userDetails);
  }, []);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="h-dvh flex flex-col shadow-md sticky top-0">
      <img src={Logo} alt="" className="w-24 md:w-40" />
      <div className=" h-full flex flex-col justify-between">
        <ul className="flex flex-col justify-between gap-1">
          <li>
            <NavLink
              to="/dashboard"
              activeClassName="active"
              className="menuLinks"
            >
              <LayoutDashboard className="w-5" />
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink to="profile" className="menuLinks">
              <UserRoundPen className="w-5" />
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="appraisal" className="menuLinks">
              <Star className="w-5" />
              Appraisal
            </NavLink>
          </li>

          <li>
            <NavLink to="comment" className="menuLinks">
              <MessageSquareText className="w-5" />
              Comment
            </NavLink>
          </li>

          {(currentUser?.role === "Admin" ||
            currentUser?.role === "Mgt" ||
            currentUser?.role === "Sub-Admin") && (
            <li>
              <p className="text-base font-semibold px-4 ">Admin Section</p>
              <ul>
                {(currentUser?.role === "Admin" ||
                  currentUser?.role === "Mgt" ||
                  currentUser?.role === "Sub-Admin") && (
                  <li>
                    <NavLink to="employees" className="menuLinks">
                      <UsersRound className="w-5" />
                      Employees
                    </NavLink>
                  </li>
                )}
                {(currentUser?.role === "Admin" ||
                  currentUser?.role === "Mgt" ||
                  currentUser?.role === "Sub-Admin") && (
                  <li>
                    <NavLink to="department" className="menuLinks">
                      <BriefcaseBusiness className="w-5" />
                      Department
                    </NavLink>
                  </li>
                )}
                {(currentUser?.role === "Admin" ||
                  currentUser?.role === "Mgt" ||
                  currentUser?.role === "Sub-Admin") && (
                  <li>
                    <NavLink to="position" className="menuLinks">
                      <HandCoins className="w-5" />
                      Position
                    </NavLink>
                  </li>
                )}

                {(currentUser?.role === "Admin" ||
                  currentUser?.role === "Mgt") && (
                  <li>
                    <NavLink to="anonymous-comments" className="menuLinks">
                      <MessageSquareText className="w-5" />
                      Anonymous
                    </NavLink>
                  </li>
                )}
                {(currentUser?.role === "Admin" ||
                  currentUser?.role === "Mgt" ||
                  currentUser?.role === "Sub-Admin") && (
                  <li>
                    <NavLink to="appraisal-questions" className="menuLinks">
                      <FileText className="w-5" />
                      App Ques.
                    </NavLink>
                  </li>
                )}
                {(currentUser?.role === "Admin" ||
                  currentUser?.role === "Mgt" ||
                  currentUser?.role === "Sub-Admin") && (
                  <li>
                    <NavLink to="allAppraisal" className="menuLinks">
                      <FileText className="w-5" />
                      All Appraisal
                    </NavLink>
                  </li>
                )}
              </ul>
            </li>
          )}
        </ul>
        <ul className="py-5 border-t-2 border-color-3">
          <li>
            <NavLink to="/login" className="menuLinks" onClick={handleLogout}>
              <LogOut className="w-5" />
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
