import { useState } from "react";
import { useDispatch } from "react-redux";
import { CheckCircle, X } from "lucide-react";
import { resetPassword } from "../stores/userStateStore";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

const AddNewPassword = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [openSuccessBox, setOpenSuccessBox] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  //   const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 8) {
      return "Weak";
    }
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
      return "Strong";
    } else if (hasUpperCase || hasLowerCase || hasNumber || hasSpecialChar) {
      return "Medium";
    } else {
      return "Weak";
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
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
      setError("Your passwords do not match!");
      return;
    }

    const newPassword = await dispatch(resetPassword({ token, password }));

    if (newPassword.meta.requestStatus === "fulfilled") {
      setMessage("Password updated successfully...");
      setOpenSuccessBox(true);
      setTimeout(() => {
        setOpenSuccessBox(false);
        setConfirmPassword("");
        setPassword("");
        navigate("/login");
      }, 3000);
    } else {
      setMessage("Password not updated...");
    }
  };

  const closePopup = () => {
    setConfirmPassword("");
    setPassword("");
  };

  return (
    <>
      <div>
        <div
          className="fixed space-y-5 w-[350px] md:min-w-[550px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white shadow-md rounded-lg z-50"
          role="dialog"
        >
          <div className="flex items-center justify-end">
            <X onClick={closePopup} className="cursor-pointer" />
          </div>
          <div className="mb-10">
            <h2 className="text-xl font-bold">Add New Password</h2>
            <p>Please use a strong password!</p>
          </div>

          <div className="form-group relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder=" "
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full px-3 py-2 border-gray-300 outline-none text-input text-xl"
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
              className="w-full px-3 py-2 border-gray-300 outline-none text-input text-xl"
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

          {/* ✅ Password requirement checklist */}
          <div className="space-y-1 text-sm mt-2">
            <p
              className={`${
                /[a-z]/.test(password) ? "text-green-600" : "text-gray-500"
              }`}
            >
              {/[a-z]/.test(password) ? "✔" : "✖"} At least one lowercase letter
            </p>
            <p
              className={`${
                password.length >= 8 ? "text-green-600" : "text-gray-500"
              }`}
            >
              {password.length >= 8 ? "✔" : "✖"} Minimum 8 characters
            </p>
            <p
              className={`${
                /[A-Z]/.test(password) ? "text-green-600" : "text-gray-500"
              }`}
            >
              {/[A-Z]/.test(password) ? "✔" : "✖"} At least one uppercase letter
            </p>
            <p
              className={`${
                /[0-9]/.test(password) ? "text-green-600" : "text-gray-500"
              }`}
            >
              {/[0-9]/.test(password) ? "✔" : "✖"} At least one number
            </p>
            <p
              className={`${
                /[!@#$%^&*(),.?":{}|<>]/.test(password)
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "✔" : "✖"} At least one
              special character
            </p>
          </div>

          {/* Password strength visual */}
          {password && (
            <p
              className={`text-sm font-semibold mt-2 ${
                passwordStrength === "Strong"
                  ? "text-green-600"
                  : passwordStrength === "Medium"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              Password Strength: {passwordStrength}
            </p>
          )}

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

        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
          onClick={closePopup}
        />
      </div>

      {openSuccessBox && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center space-y-4">
            <CheckCircle className="text-green-500 w-12 h-12 mx-auto" />
            <h2 className="text-xl font-bold text-gray-800">{message}</h2>
            <p className="text-gray-600">
              Please check your email for further instructions.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewPassword;
