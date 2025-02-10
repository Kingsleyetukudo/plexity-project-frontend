import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { UserRoundPen } from "lucide-react";
import EmployeePositionBox from "../components/employeePostionBox";
import { getAllDepartments } from "../stores/departmentStore";
import { getAllPositions } from "../stores/positionStore";
import { updateUser } from "../stores/userStateStore";

const Profile = () => {
  const [title] = useState("Profile");
  const [detail, setDetails] = useState(false);
  // const dispatch = useDispatch();
  // const [user, setUser] = useState({
  //   fullName: "John Doe",
  //   dob: "1990-05-15",
  //   location: "Lagos, Nigeria",
  //   department: "Software Development",
  //   yearOfEmployment: "2022",
  //   maritalStatus: "Single",
  //   bankDetails: "GTBank - 1234567890",
  //   homeAddress: "123, Example Street, Lagos",
  //   position: "Senior Developer",
  //   avatar: "https://via.placeholder.com/150",
  // });

  const { id } = useParams(); // Get the userId from the URL
  const { users } = useSelector((state) => state.auth);
  const [employeeDetails, setEmployeeDetails] = useState();
  const dispatch = useDispatch();

  // Find the user by userId
  const user = users.find((user) => user._id === id);

  useEffect(() => {
    dispatch(getAllDepartments());
    dispatch(getAllPositions());
  }, [dispatch]);

  if (!user) {
    return <p>User not found</p>;
  }

  const handlePositionChanger = (user) => {
    setDetails(!detail);
    setEmployeeDetails(user);
    console.log(employeeDetails);
  };

  const handleUpdate = (id, userData) => {
    console.log(id, userData);
    dispatch(updateUser({ id, userData: { userData } }));
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-5 overflow-hidden">
        <div className="flex justify-between items-center gap-10">
          <h1 className="font-extrabold text-xl md:text-3xl">{title}</h1>
          <div className="font-bold flex gap-5 items-center">
            <p>
              Role: <span className="uppercase">{user.role}</span>
            </p>
            <UserRoundPen
              className="cursor-pointer"
              onClick={() => handlePositionChanger(user)}
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {user.firstName}&apos;s Detail
        </h2>
        <div className="flex flex-col items-center mb-4 w-full">
          <img
            src={user.avatar}
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
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full overflow-x-hidden">
          <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
            <p className="text-gray-600 font-medium">Full Name</p>
            <p className="text-lg font-semibold">
              {user.firstName} {user.lastName}
            </p>
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

      {detail && (
        <EmployeePositionBox
          closePopupNote={handlePositionChanger}
          employeeDetails={user}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default Profile;
