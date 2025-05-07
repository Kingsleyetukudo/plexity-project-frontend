import { useState } from "react";
import img from "../assets/images/forget-password.svg";
import logo from "../assets/images/site-logo.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgetPassword } from "../stores/userStateStore";
import { CheckCircle } from "lucide-react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setError("");
    dispatch(forgetPassword(email))
      .unwrap()
      .then((response) => {
        console.log(response);
        setLoading(false);
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate("/login");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
        setLoading(false);
      });
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

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading || !email}
                  onClick={handleSubmit}
                  className={`text-xl font-bold px-16 py-4 text-white bg-color-2 rounded-full hover:bg-color-1 focus:outline-none focus:ring-2 focus:ring-color-1 ${
                    loading || !email ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
              <p className="text-sm text-center">
                I have remember my password?&nbsp;
                <Link
                  to="/login"
                  className="font-bold text-lg underline text-indigo-600"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
          <div className="w-1/2 max-sm:hidden">
            <img src={img} alt="Password Illustration" className="h-full" />
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center space-y-4">
            <CheckCircle className="text-green-500 w-12 h-12 mx-auto" />
            <h2 className="text-xl font-bold text-gray-800">
              Message Sent Successfully!
            </h2>
            <p className="text-gray-600">
              Please check your email for further instructions.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgetPassword;
