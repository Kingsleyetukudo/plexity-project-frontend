import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllAppraisal } from "../stores/appraisalStore";
import TitleBar from "../components/titleBar";

const Profile = () => {
  const [title] = useState("Profile");
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    fullName: "John Doe",
    dob: "1990-05-15",
    location: "Lagos, Nigeria",
    department: "Software Development",
    yearOfEmployment: "2022",
    maritalStatus: "Single",
    bankDetails: "GTBank - 1234567890",
    homeAddress: "123, Example Street, Lagos",
    position: "Senior Developer",
    avatar: "https://via.placeholder.com/150",
  });

  useEffect(() => {
    dispatch(getAllAppraisal());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-5 overflow-hidden">
      <TitleBar title={title} />
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        User Details
      </h2>
      <div className="flex flex-col items-center mb-4 w-full">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-gray-300"
        />
        <input
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
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full overflow-x-hidden">
        <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
          <p className="text-gray-600 font-medium">Full Name</p>
          <p className="text-lg font-semibold">{user.fullName}</p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
          <p className="text-gray-600 font-medium">Date of Birth</p>
          <p className="text-lg font-semibold">{user.dob}</p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
          <p className="text-gray-600 font-medium">Location</p>
          <p className="text-lg font-semibold">{user.location}</p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
          <p className="text-gray-600 font-medium">Department</p>
          <p className="text-lg font-semibold">{user.department}</p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
          <p className="text-gray-600 font-medium">Year of Employment</p>
          <p className="text-lg font-semibold">{user.yearOfEmployment}</p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
          <p className="text-gray-600 font-medium">Marital Status</p>
          <p className="text-lg font-semibold">{user.maritalStatus}</p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
          <p className="text-gray-600 font-medium">Bank Account Details</p>
          <p className="text-lg font-semibold">{user.bankDetails}</p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
          <p className="text-gray-600 font-medium">Home Address</p>
          <p className="text-lg font-semibold">{user.homeAddress}</p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
          <p className="text-gray-600 font-medium">Position</p>
          <p className="text-lg font-semibold">{user.position}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
