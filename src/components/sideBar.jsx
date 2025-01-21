import { NavLink } from "react-router-dom";
import dashboardIcon from "../assets/images/Dashboard.svg";
import Logo from "../assets/images/plexityLogo.png";
// import { useSelector } from "react-redux";

const SideBar = () => {
  return (
    <div className="h-dvh flex flex-col shadow-md">
      <img src={Logo} alt="" className="w-24 md:w-40" />
      <div className=" h-full flex flex-col justify-between">
        <ul className="flex flex-col justify-between gap-1">
          <li>
            <NavLink
              to="/dashboard"
              activeClassName="active"
              className="menuLinks"
            >
              <img src={dashboardIcon} alt="" className="w-5" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="profile" className="menuLinks">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="appraisal" className="menuLinks">
              Appraisal
            </NavLink>
          </li>
          <li>
            <NavLink to="leave" className="menuLinks">
              Leave
            </NavLink>
          </li>
          <li>
            <NavLink to="goals" className="menuLinks">
              Goals
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to="settings" className="menuLinks">
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="menuLinks">
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
