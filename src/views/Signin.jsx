import { useState } from "react";
import Logo from "../assets/images/site-logo.png";
import { Link } from "react-router-dom";
import BG from "../assets/images/sign-up-bg.svg";
const Signin = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <div className="md:flex items-center justify-center  min-h-screen">
        <div className="md:flex flex-row-reverse md:w-3/4 md:shadow-2xl">
          <div className="w-full md:w-1/2 p-6 md:pr-20 md:py-10">
            <div className="flex gap-16 items-center mb-5">
              <img src={Logo} alt="" className="w-12 md:w-16" />
              <h2 className="text-3xl font-bold">Sign Up</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex justify-between gap-5 md:space-y-0">
                <div className="form-group relative w-full">
                  <input
                    type="text"
                    id="firstName"
                    placeholder=" "
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border-b-2 border-gray-300 outline-none text-input"
                  />
                  <label
                    htmlFor="firstName"
                    className="block absolute font-medium text-gray-700"
                  >
                    First Name: <span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="form-group relative w-full">
                  <input
                    type="text"
                    id="lastName"
                    placeholder=" "
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border-b-2 border-gray-300 outline-none text-input"
                  />
                  <label
                    htmlFor="email"
                    className="block absolute font-medium text-gray-700"
                  >
                    Last Name: <span className="text-red-600">*</span>
                  </label>
                </div>
              </div>
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
                  Email: <span className="text-red-600">*</span>
                </label>
              </div>
              <div className="form-group relative">
                <select
                  name=""
                  id=""
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                  className="w-full px-3 py-2 border-b-2 border-gray-300 outline-none text-input"
                >
                  <option value="" disabled selected>
                    Selection your position
                  </option>
                  <option value="Staff">Staff</option>
                  <option value="Manager">Manager</option>
                  <option value="Founder">Founder</option>
                </select>
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
                  Password: <span className="text-red-600">*</span>
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
              <div className="flex justify-end">
                <button
                  type="submit"
                  className=" text-xl font-bold px-16 py-4  text-white bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Sign Up
                </button>
              </div>

              <p className="text-sm text-center">
                Already have an account &nbsp;
                <Link
                  to="/login"
                  className="font-bold text-lg underline text-color-1"
                >
                  Log-In
                </Link>
              </p>
            </form>
          </div>
          <div className="max-sm:hidden w-1/2 flex items-center justify-center">
            <img src={BG} alt="" className="w-4/5" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
