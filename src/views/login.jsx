/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import img from "../assets/images/login-image.svg";
import logo from "../assets/images/site-logo.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../stores/userStateStore";
// import StaffBiodataForm from "../components/StaffBiodataForm";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [showProfileModal, setShowProfileModal] = useState(false);
  // const { user, token } = useSelector((state) => state.auth);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!window.grecaptcha) {
      console.error("reCAPTCHA not loaded!");
      return;
    }

    try {
      const reCaptchatoken = await window.grecaptcha.execute(
        import.meta.env.VITE_RECAPTCHA_SITE_KEY,
        {
          action: "submit",
        }
      );

      const result = await dispatch(login({ email, password, reCaptchatoken }));

      console.log(result.payload);

      if (result?.payload?.message === "Email not found!") {
        setError("This email is not registered.");
        return; // Prevent navigation to the dashboard
      }

      if (result?.payload?.message === "Incorrect password") {
        setError("Password incorrect");
        return; // Prevent navigation to the dashboard
      }

      // Check if the user is approved
      if (result?.payload?.isApproved === false) {
        setError("Your account is pending approval by the admin.");
        return; // Prevent navigation to the dashboard if not approved
      }
      // Check if profile is completed
      if (result?.payload?.user?.profileCompleted === false) {
        navigate("/dashboard"); // Redirect to dashboard if profile is complete
        // setTimeout(() => setShowProfileModal(true), 1000); // Show profile form popup
      } else {
        navigate("/dashboard"); // Redirect to dashboard if profile is complete
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "Invalid email or password");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <div className="login-container flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full md:w-4/5 p-5 max-sm:p-3 flex max-sm:flex-col bg-white shadow-md">
          <div className="w-full md:w-1/2 p-4 md:p-24 space-y-10">
            <img src={logo} alt="Logo" className="w-16" />
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && <p className="text-red-600">{error}</p>}
              <div className="form-group relative">
                <input
                  type="email"
                  id="email"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border-b-2 border-gray-300 outline-none text-input"
                />
                <label
                  htmlFor="email"
                  className="block absolute font-medium text-gray-700"
                >
                  Enter Email: <span className="text-red-600">*</span>
                </label>
              </div>
              <div className="form-group relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border-b-2 border-gray-300 outline-none text-input"
                />
                <label
                  htmlFor="password"
                  className="block absolute font-medium text-gray-700"
                >
                  Enter Password: <span className="text-red-600">*</span>
                </label>
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="form-group flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 block text-sm text-gray-900">
                  Remember Me
                </span>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="text-xl font-bold px-16 py-4 text-white bg-color-2 rounded-full hover:bg-color-1 focus:outline-none focus:ring-2 focus:ring-color-1"
                >
                  Login
                </button>
              </div>
              <p className="text-sm text-center">
                I don't have an account?&nbsp;
                <Link
                  to="/signin"
                  className="font-bold text-lg underline text-indigo-600"
                >
                  Sign-up
                </Link>
              </p>
            </form>
          </div>
          <div className="w-1/2 max-sm:hidden">
            <img src={img} alt="Login Illustration" className="h-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
