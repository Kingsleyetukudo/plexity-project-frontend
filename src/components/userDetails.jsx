import notification from "../assets/images/Notifications.svg";
import menu from "../assets/images/menu-icon.svg";
import userProfile from "../assets/images/user-icon.svg";
import { useSelector } from "react-redux";
// import { toggleBar } from "../stores/userStateStore";
import { Link } from "react-router-dom";
import { usePageToggle } from "./ToggleSettings";
const UserDetails = () => {
  const { user } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  const { toggleSideBar } = usePageToggle();

  const openNavBar = () => {
    // dispatch(toggleBar());
    toggleSideBar();
  };
  return (
    <div className="flex flex-col gap-3 md:flex-row justify-between items-center p-5 rounded-md shadow-md">
      <div className="max-sm:w-full flex items-center gap-4">
        <h1 className="font-semibold">Welcome Back!</h1>
        <p className="text-lg font-extrabold">{user?.firstName}</p>
      </div>
      <div className="max-sm:w-full flex gap-4 items-center justify-between">
        <div className="user-image">
          <img
            src={menu}
            alt=""
            className="w-6 cursor-pointer"
            onClick={openNavBar}
          />
        </div>
        <div className="flex gap-4 md:gap-6 items-center">
          <span className="relative">
            <img src={notification} alt="" className="w-6" />
            <span className="w-2 h-2 bg-red-700 absolute top-0 right-1 rounded-full"></span>
          </span>
          <span>
            <Link to="/dashboard/profile">
              <img
                src={user?.userProfileImage || userProfile}
                alt="User"
                className="w-10 md:w-10 h-10 rounded-full border-2 object-fill cursor-pointer"
              />
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
