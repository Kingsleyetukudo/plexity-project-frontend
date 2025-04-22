import { useState, useEffect } from "react";
import img from "../assets/images/login-image.svg";
import logo from "../assets/images/site-logo.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../stores/userStateStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [reCaptchaReady, setReCaptchaReady] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loadPage = async () => {
      const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

      try {
        // ⏳ Simulate a short silent page "refresh"
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Load reCAPTCHA
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
        script.async = true;
        script.onload = () => {
          console.log("reCAPTCHA loaded silently.");
          setReCaptchaReady(true);
          setPageReady(true);
        };
        script.onerror = () => {
          console.error("Failed to load reCAPTCHA script.");
          setError("reCAPTCHA failed to load. Please try again.");
          setPageReady(true); // allow retry
        };
        document.head.appendChild(script);
      } catch (err) {
        console.error("Silent init failed", err);
        setError("Unexpected error occurred during initialization.");
        setPageReady(true); // fail gracefully
      }
    };

    loadPage();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!window.grecaptcha || !window.grecaptcha.execute) {
      console.error("reCAPTCHA not loaded!");
      setError("reCAPTCHA failed to load. Please try again.");
      setLoading(false);
      return;
    }

    try {
      console.log("Executing reCAPTCHA...");
      const reCaptchatoken = await window.grecaptcha.execute(
        import.meta.env.VITE_RECAPTCHA_SITE_KEY,
        { action: "submit" }
      );

      if (!reCaptchatoken) {
        setError("Failed to generate reCAPTCHA token.");
        setLoading(false);
        return;
      }

      const result = await dispatch(
        login({ email, password, reCaptchatoken })
      ).unwrap();

      if (result?.message === "Email not found!") {
        setError("This email is not registered.");
        setLoading(false);
        return;
      }

      if (result?.message === "Incorrect password") {
        setError("Incorrect password");
        setLoading(false);
        return;
      }

      if (!result?.isApproved) {
        setError("Your account is pending approval by the admin.");
        setLoading(false);
        return;
      }

      if (result?.message === "Login successful") {
        navigate("/dashboard");
        return;
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
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
                  disabled={!pageReady || loading || !reCaptchaReady}
                  className={`text-xl font-bold px-16 py-4 text-white bg-color-2 rounded-full hover:bg-color-1 focus:outline-none focus:ring-2 focus:ring-color-1 ${
                    !pageReady || loading || !reCaptchaReady
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
              <p className="text-sm text-center">
                I don&#39;t have an account?&nbsp;
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
      {!pageReady && (
        <div className="text-center text-gray-500 text-sm">
          Preparing login...
        </div>
      )}
    </>
  );
};

export default Login;
