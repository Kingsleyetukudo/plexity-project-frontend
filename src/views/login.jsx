/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import img from "../assets/images/login-image.png";
import logo from "../assets/images/site-logo.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password, rememberMe });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="login-container flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full md:w-4/5 p-5 max-sm:p-3 flex max-sm:flex-col bg-white shadow-md">
        <div className=" w-full md:w-1/2 p-4 md:p-24 space-y-10">
          <img src={logo} alt="" className="w-16" />
          {/* <h2 className="text-2xl font-bold text-center">Login</h2> */}
          <form onSubmit={handleSubmit} className="space-y-8">
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
            <div className="form-group relative ">
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
                className="block absolutes  font-medium text-gray-700"
              >
                Enter Password: <span className="text-red-600">*</span>
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
              <p className="text-sm text-right mt-2">Forget Password?</p>
            </div>
            <div className="form-group flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="ml-2  block text-sm text-gray-900">
                Remember Me
              </span>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className=" text-xl font-bold px-16 py-4  text-white bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>

            <p className="text-sm text-center">
              I don't have account &nbsp;
              <Link
                to="/signin"
                className="font-bold text-lg underline text-color-1"
              >
                Sign-up
              </Link>
            </p>
          </form>
        </div>
        <div className="w-1/2 max-sm:hidden">
          <img src={img} alt="" className="h-full" />
        </div>
      </div>
    </div>
  );
};

export default Login;
