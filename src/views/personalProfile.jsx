import { useState } from "react";
import { useSelector } from "react-redux";
import avatar from "../assets/images/user-icon.svg";
import AddNewPassword from "../components/addNewPassword";
import moment from "moment";
import { Camera, LockKeyhole, UserPen } from "lucide-react";
import { uploadToCloudinary } from "../utils/cloudinary";
import { updateUser } from "../stores/userStateStore";
import { useDispatch } from "react-redux";
import ProfileEditingBox from "../components/ProfileEditingBox";

// import EmployeePositionBox from "../components/employeePostionBox";

const PersonalProfile = () => {
  const [title] = useState("Profile");
  const [openPassword, setOpenPassword] = useState(false);
  const [showEditBox, setShowEditBox] = useState(false);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  // const { id } = useParams(); // Get the userId from the URL
  const { user } = useSelector((state) => state.auth);

  // Find the user by userId
  // const user = users.find((user) => user._id === id);

  const handlePasswordToggle = () => {
    setOpenPassword(!openPassword);
    // console.log("click");
  };

  const handleShowEditBox = () => {
    setShowEditBox(!showEditBox);
  };

  const handleUpdate = (id, userData) => {
    // console.log(id, userData);
    dispatch(updateUser({ userId: id, userData }));
  };

  const handleImageUpload = async (e) => {
    // console.log("Image upload triggered");
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const imageUrl = await uploadToCloudinary(file);
      // console.log("Image uploaded successfully:", imageUrl);

      dispatch(
        updateUser({
          userId: user._id,
          userData: { userProfileImage: imageUrl },
        })
      );
    } catch (error) {
      console.error("Error uploading image or updating profile:", error);
    } finally {
      setUploading(false);
    }
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
          <div className="relative w-fit">
            <img
              src={user.userProfileImage || avatar}
              alt="User Avatar"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-gray-300 z-10"
            />
            <div
              className="absolute right-0 bottom-5 max-sm:bottom-3 z-10 bg-color-2 text-white rounded-full w-10 h-10 p-2 cursor-pointer flex items-center justify-center"
              onClick={() => document.getElementById("file-upload").click()} // Trigger file input click
            >
              <Camera />
            </div>

            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          </div>

          <div className="flex gap-5 mt-4 w-full max-sm:justify-between">
            <button
              onClick={handlePasswordToggle}
              className="md:text-base font-normal text-black focus:outline-none  flex items-center gap-3 max-sm:flex-col-reverse"
            >
              Change Password <LockKeyhole />
            </button>

            <button
              onClick={handleShowEditBox}
              className="md:text-base font-normal text-black focus:outline-none flex items-center gap-3 max-sm:flex-col-reverse"
            >
              Edit Profile <UserPen />
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
              {user.dob ? (
                <p className="text-lg font-semibold">
                  {moment(user.dob).format("MMM Do YYYY")}
                </p>
              ) : (
                <p className="text-lg font-semibold">Null</p>
              )}
            </div>
            <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
              <p className="text-gray-600 font-medium">Sex</p>
              <p className="text-lg font-semibold">{user.sex}</p>
            </div>
          </div>

          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full overflow-x-hidden">
            <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
              <p className="text-gray-600 font-medium">Marital Status</p>
              <p className="text-lg font-semibold">{user.maritalStatus}</p>
            </div>
            <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
              <p className="text-gray-600 font-medium">Email</p>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>
            <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
              <p className="text-gray-600 font-medium">Phone Number</p>
              <p className="text-lg font-semibold">{user.phone}</p>
            </div>
          </div>

          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full overflow-x-hidden">
            <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
              <p className="text-gray-600 font-medium">Home Address</p>
              <p className="text-lg font-semibold">{user.address}</p>
            </div>
            <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
              <p className="text-gray-600 font-medium">Location</p>
              {user.stateOfOrigin ? (
                <p className="text-lg font-semibold">{user.stateOfOrigin}</p>
              ) : (
                <p className="text-lg font-semibold">Null</p>
              )}
            </div>
            <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
              <p className="text-gray-600 font-medium">Disablities</p>
              {user.disabilityType ? (
                <p className="text-lg font-semibold">{user.disabilityType}</p>
              ) : (
                <p className="text-lg font-semibold">Null</p>
              )}
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
                  {user?.accountDetails?.accountName}
                </p>
              </div>
              <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
                <p className="text-gray-600 font-medium">Account Number</p>
                <p className="text-lg font-semibold">
                  {user?.accountDetails?.accountNumber}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-gray-600 font-medium">Work Details</p>
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full overflow-x-hidden">
              <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
                <p className="text-gray-600 font-medium">Department</p>
                <p className="text-lg font-semibold">{user.department}</p>
              </div>
              <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
                <p className="text-gray-600 font-medium">Position</p>
                <p className="text-lg font-semibold">{user.position}</p>
              </div>
              <div className="p-4 border rounded-lg shadow-sm text-center sm:text-left">
                <p className="text-gray-600 font-medium">Year of Employment</p>
                <p className="text-lg font-semibold">{user.employmentYear}</p>
              </div>
            </div>
          </div>
        </div>

        <div></div>
      </div>

      {openPassword && (
        <AddNewPassword handlePasswordToggle={handlePasswordToggle} />
      )}

      {showEditBox && (
        <ProfileEditingBox
          closePopupNote={handleShowEditBox}
          employeeDetails={user}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default PersonalProfile;
