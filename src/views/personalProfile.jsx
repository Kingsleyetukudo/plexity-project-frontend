import { useState } from "react";
import { useSelector } from "react-redux";
import avatar from "../assets/images/user-icon.svg";
import AddNewPassword from "../components/addNewPassword";
import moment from "moment";

// import EmployeePositionBox from "../components/employeePostionBox";

const PersonalProfile = () => {
  const [title] = useState("Profile");
  const [openPassword, setOpenPassword] = useState(false);

  // const { id } = useParams(); // Get the userId from the URL
  const { user } = useSelector((state) => state.auth);

  // Find the user by userId
  // const user = users.find((user) => user._id === id);

  const handlePasswordToggle = () => {
    setOpenPassword(!openPassword);
    console.log("click");
  };

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-5 overflow-hidden">
        <div className="flex justify-between items-center gap-10">
          <h1 className="font-extrabold text-xl md:text-3xl">{title}</h1>
          <div className="font-bold flex gap-5 items-center">
            <p>
              Role: <span className="uppercase">{user.role}</span>
            </p>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {user.firstName}&apos;s Detail
        </h2>
        <div className="flex flex-col items-center mb-4 w-full">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-gray-300"
          />

          {/* <input
            type="file"
            accept="image/*"
            className="mt-2 text-sm text-gray-600"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  setUser((prevUser) => ({
                    ...prevUser,
                    avatar: event.target.result,
                  }));
                };
                reader.readAsDataURL(file);
              }
            }}
          /> */}

          <div>
            <button
              onClick={handlePasswordToggle}
              className="md:text-base font-normal px-4 py-1 md:px-5 md:py-3 text-white bg-color-2 rounded-full hover:bg-color-1 focus:outline-none focus:ring-2 focus:ring-color-1"
            >
              Change Password
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1  gap-4 w-full overflow-x-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full overflow-x-hidden">
            <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
              <p className="text-gray-600 font-medium">Full Name</p>
              <p className="text-lg font-semibold">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
              <p className="text-gray-600 font-medium">Date of Birth</p>
              <p className="text-lg font-semibold">
                {moment(user.dob).format("MMM Do YYYY")}
              </p>
            </div>
            <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
              <p className="text-gray-600 font-medium">Location</p>
              <p className="text-lg font-semibold">{user.stateOfOrigin}</p>
            </div>
          </div>

          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full overflow-x-hidden">
            <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
              <p className="text-gray-600 font-medium">Department</p>
              <p className="text-lg font-semibold">{user.department}</p>
            </div>
            <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
              <p className="text-gray-600 font-medium">Year of Employment</p>
              <p className="text-lg font-semibold">{user.employmentYear}</p>
            </div>
            <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
              <p className="text-gray-600 font-medium">Marital Status</p>
              <p className="text-lg font-semibold">{user.maritalStatus}</p>
            </div>
          </div>

          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full overflow-x-hidden">
            <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
              <p className="text-gray-600 font-medium">Email</p>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>
            <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
              <p className="text-gray-600 font-medium">Phone Number</p>
              <p className="text-lg font-semibold">{user.phone}</p>
            </div>
            <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
              <p className="text-gray-600 font-medium">Sex</p>
              <p className="text-lg font-semibold">{user.sex}</p>
            </div>
          </div>

          <div>
            <p className="text-gray-600 font-medium">Bank Account Details</p>
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full overflow-x-hidden">
              <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
                <p className="text-gray-600 font-medium">Bank Name</p>
                <p className="text-lg font-semibold">
                  {user?.accountDetails?.bankName}
                </p>
              </div>
              <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
                <p className="text-gray-600 font-medium">Account Name</p>
                <p className="text-lg font-semibold">
                  {user?.accountDetails?.accountNumber}
                </p>
              </div>
              <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
                <p className="text-gray-600 font-medium">Account Number</p>
                <p className="text-lg font-semibold">
                  {user?.accountDetails?.bankName}
                </p>
              </div>
            </div>
          </div>

          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full overflow-x-hidden">
            <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
              <p className="text-gray-600 font-medium">Home Address</p>
              <p className="text-lg font-semibold">{user.address}</p>
            </div>
            <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
              <p className="text-gray-600 font-medium">Position</p>
              <p className="text-lg font-semibold">{user.position}</p>
            </div>
            <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
              <p className="text-gray-600 font-medium">Position</p>
              <p className="text-lg font-semibold">{user.position}</p>
            </div>
          </div>
        </div>
      </div>

      {openPassword && (
        <AddNewPassword handlePasswordToggle={handlePasswordToggle} />
      )}
    </>
  );
};

export default PersonalProfile;
