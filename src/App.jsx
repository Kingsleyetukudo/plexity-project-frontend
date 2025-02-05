import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./views/login";
import Dashboard from "./views/Dashboard";
import Signin from "./views/Signin";
import Profile from "./views/profile";
import Appraisal from "./views/appraisal";
import Leaves from "./views/leave";
import Settings from "./views/settings";
import Goals from "./views/goals";
import DashboardDefault from "./views/dashboardDefault";
import AppraisalDetails from "./views/appraisalDetails";
import AdminDashboard from "./views/AdminDashboard";
import Employees from "./views/employee";
import Comment from "./views/comment";
import Department from "./views/department";
import Position from "./views/position";
import AnonymousComments from "./views/anonymousComments";

// Function to check if user is authenticated
const getUser = () => {
  try {
    const storedUser = localStorage.getItem("persist:auth");
    if (!storedUser) return null;
    return JSON.parse(JSON.parse(storedUser).user);
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

function App() {
  const user = getUser();

  return (
    <Router>
      <Routes>
        {/* If user is not authenticated, redirect to login */}
        <Route
          path="/"
          element={
            user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />

        {/* Admin dashboard route */}
        <Route
          path="/admin-dashboard"
          element={user ? <AdminDashboard /> : <Navigate to="/login" />}
        />

        {/* Regular dashboard routes (Protected) */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        >
          <Route index element={<DashboardDefault />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="appraisal" element={<Appraisal />} />
          <Route path="leave" element={<Leaves />} />
          <Route path="settings" element={<Settings />} />
          <Route path="goals" element={<Goals />} />
          <Route path="appraisal/:id" element={<AppraisalDetails />} />
          <Route path="comment" element={<Comment />} />
          <Route path="employees" element={<Employees />} />
          <Route path="department" element={<Department />} />
          <Route path="position" element={<Position />} />
          <Route path="anonymous-comments" element={<AnonymousComments />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
