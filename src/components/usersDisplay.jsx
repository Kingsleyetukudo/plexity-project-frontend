import { useSelector } from "react-redux";
import userDefualt from "../assets/images/user-icon.svg";

const UserDisplay = () => {
  const { user } = useSelector((state) => state.auth);

  console.table(user);
  return (
    <>
      <div>
        <h1>All Staff</h1>

        <div key={user._id}>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-2 items-start gap-4">
              <span className="border border-red-200">
                First Name: {user.firstName}
              </span>
              <span>Last Name: {user.lastName}</span>
              <span>Email: {user.email}</span>
            </div>
            <div>
              <img src={userDefualt} alt="" />
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default UserDisplay;
