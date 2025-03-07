import { useEffect, useState } from "react";
import Logo from "../assets/images/site-logo.png";
import { Link, useNavigate } from "react-router-dom";
import BG from "../assets/images/sign-up-bg.svg";
import { useDispatch, useSelector } from "react-redux";
import { CircleCheckBig } from "lucide-react";
import { createUsers } from "../stores/userStateStore";
import { getAllDepartments } from "../stores/departmentStore";
import { getAllPositions } from "../stores/positionStore";

const Signin = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const { departments } = useSelector((state) => state.department);
  const { positions } = useSelector((state) => state.position);
  const [department, setDepartment] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closePopup = () => {
    setShowPopup(false);
    setTimeout(() => navigate("/login"), 500);
  };

  useEffect(() => {
    dispatch(getAllDepartments());
    dispatch(getAllPositions());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the reCAPTCHA script is loaded
    if (!window.grecaptcha) {
      setError("reCAPTCHA not loaded, check connection!");
      console.error("reCAPTCHA not loaded!");
      return;
    }

    try {
      // Generate reCAPTCHA token
      const token = await window.grecaptcha.execute(
        import.meta.env.VITE_RECAPTCHA_SITE_KEY,
        {
          action: "submit",
        }
      );

      const payload = {
        firstName,
        lastName,
        email,
        isApproved: false,
        position,
        department,
        token,
      };

      // if (password !== confirmPassword) {
      //   setError("Passwords do not match!");
      //   return;
      // }

      setError("");

      const result = await dispatch(createUsers(payload));

      if (result.meta.requestStatus === "fulfilled") {
        setShowPopup(true);
      } else {
        setError(result?.payload?.message);
      }
    } catch (error) {
      console.error("Error executing reCAPTCHA:", error);
      setError("reCAPTCHA verification failed.");
    }
  };

  // const togglePasswordVisibility = () => {
  //   setShowPassword((prevState) => !prevState);
  // };

  return (
    <div className="md:flex items-center justify-center min-h-screen">
      <div className="md:flex flex-row-reverse md:w-3/4 md:shadow-2xl">
        <div className="w-full md:w-1/2 p-6 md:pr-20 md:py-10">
          <div className="flex gap-16 items-center mb-5">
            <img src={Logo} alt="" className="w-12 md:w-16" />
            <h2 className="text-3xl font-bold">Sign Up</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && <p className="text-red-600">{error}</p>}

            <div className="flex justify-between gap-5 md:space-y-0">
              <div className="form-group relative w-full">
                <input
                  type="text"
                  placeholder=" "
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-3 py-2  border-gray-300 outline-none text-input"
                />
                <label className="block absolute font-medium text-gray-700">
                  First Name: <span className="text-red-600">*</span>
                </label>
              </div>
              <div className="form-group relative w-full">
                <input
                  type="text"
                  placeholder=" "
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full px-3 py-2  border-gray-300 outline-none text-input"
                />
                <label className="block absolute font-medium text-gray-700">
                  Last Name: <span className="text-red-600">*</span>
                </label>
              </div>
            </div>

            <div className="form-group relative">
              <input
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2  border-gray-300 outline-none text-input"
              />
              <label className="block absolute font-medium text-gray-700">
                Email: <span className="text-red-600">*</span>
              </label>
            </div>

            <div className="flex justify-between gap-5 md:space-y-0">
              <div className="form-group relative w-full">
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 outline-none text-input"
                >
                  <option value="" disabled>
                    Select a Department
                  </option>
                  {departments.map((pos) => (
                    <option key={pos.id} value={pos.name}>
                      {pos.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group relative w-full">
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 outline-none text-input"
                >
                  <option value="" disabled>
                    Select a position
                  </option>
                  {positions.map((pos) => (
                    <option key={pos.id} value={pos.name}>
                      {pos.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* <div className="form-group relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2  border-gray-300 outline-none text-input"
              />
              <label className="block absolute font-medium text-gray-700">
                Password: <span className="text-red-600">*</span>
              </label>
            </div> */}

            {/* <div className="form-group relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder=" "
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2  border-gray-300 outline-none text-input"
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
            </div> */}

            <div className="flex justify-end">
              <button
                type="submit"
                className="text-xl font-bold px-16 py-4 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Submitting" : "Sign Up"}
              </button>
            </div>

            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-lg underline text-indigo-600"
              >
                Log In
              </Link>
            </p>
          </form>

          {showPopup && (
            <>
              <div
                className="fixed space-y-5 text-center w-[300px] md:min-w-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white shadow-md rounded-lg z-50"
                role="dialog"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
              >
                <div className="flex justify-center items-center">
                  <CircleCheckBig className="text-5xl text-green-600" />
                </div>
                <h2 id="modal-title" className="font-bold">
                  Thank you for registering!
                </h2>
                <p id="modal-description">
                  Your account is currently <span>pending approval.</span> We
                  will review your information shortly, and once your account is
                  approved, you will receive an email notification with your
                  login details. After approval, you will be able to proceed
                  with full personal information.{" "}
                </p>

                <div className="mt-6">
                  <button
                    onClick={closePopup}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div
                className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
                onClick={closePopup}
              />
            </>
          )}
        </div>
        <div className="max-sm:hidden w-1/2 flex items-center justify-center">
          <img src={BG} alt="" className="w-4/5" />
        </div>
      </div>
    </div>
  );
};

export default Signin;
