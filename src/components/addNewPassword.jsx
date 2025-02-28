import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { createDepartment, getAllDepartments } from "../stores/departmentStore";
import PopUpBox from "./popupBox";
import PropTypes from "prop-types";
import { X } from "lucide-react";
import { updateUser } from "../stores/userStateStore";

const AddNewPassword = ({ handlePasswordToggle }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [openSuccessBox, setOpenSuccessBox] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // const handleUserSelect = (user) => {
  //   setSelectedUser(user);
  //   console.log("Selected User:", user);
  // };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handlePassword = async () => {
    if (!password) {
      setError("Please enter password!");
      return;
    }

    if (!confirmPassword) {
      setError("Please enter confirm password!");
      return;
    }

    if (confirmPassword !== password) {
      setError("your passwords do not match!!!");
      return;
    }

    const newPassword = await dispatch(
      updateUser({ userId: user._id, userData: { password } })
    );
    console.log(password, "hi");
    if (newPassword.meta.requestStatus === "fulfilled") {
      setMessage("Password updated successfully...");
      setOpenSuccessBox(true);

      // Delay closing popup so success message is visible
      setTimeout(() => {
        setOpenSuccessBox(false);
        handlePasswordToggle(); // Close after success message is shown
        setConfirmPassword("");
        setPassword("");
        // dispatch(getAllDepartments());
      }, 3000); // 2 seconds delay
    } else {
      setMessage("Department not added...");
    }
  };

  const closePopup = () => {
    handlePasswordToggle();
    setConfirmPassword("");
    setPassword("");
  };

  return (
    <>
      <div>
        {/* Comment Popup */}
        <div
          className="fixed space-y-5 w-[350px] md:min-w-[550px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white shadow-md rounded-lg z-50"
          role="dialog"
        >
          <div className="flex items-center justify-end">
            <X onClick={closePopup} className="cursor-pointer" />
          </div>
          <div className="mb-10">
            <h2 className="text-xl font-bold">Add New Password </h2>
            <p>Please use strong password!!!</p>
          </div>

          <div className="form-group relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2  border-gray-300 outline-none text-input text-xl"
            />
            <label className="block absolute font-medium text-gray-700">
              Password: <span className="text-red-600">*</span>
            </label>
          </div>

          <div className="form-group relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder=" "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2  border-gray-300 outline-none text-input text-xl"
            />
            <label className="block absolute font-medium text-gray-700">
              Confirm Password: <span className="text-red-600">*</span>
            </label>

            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "5px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {error && <p className="text-red-600">{error}</p>}
          <div className="flex justify-end">
            <button
              onClick={handlePassword}
              className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </div>
        {/* Background overlay */}
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
          onClick={closePopup}
        />
      </div>

      {/* Success Message Popup */}
      {openSuccessBox && <PopUpBox note={message} />}
    </>
  );
};

AddNewPassword.propTypes = {
  handlePasswordToggle: PropTypes.func.isRequired,
};

export default AddNewPassword;
