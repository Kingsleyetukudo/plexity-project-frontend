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
} from "lucide-react";

const SideBar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    console.log("logout");
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
            <NavLink to="employee" className="menuLinks">
              <UsersRound className="w-5" />
              Employees
            </NavLink>
          </li>
          <li>
            <NavLink to="comment" className="menuLinks">
              <MessageSquareText className="w-5" />
              Comment
            </NavLink>
          </li>
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
