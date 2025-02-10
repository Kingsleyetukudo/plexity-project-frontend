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
import DashboardDefault from "./views/dashboardDefault";
import AppraisalDetails from "./views/appraisalDetails";
import AdminDashboard from "./views/AdminDashboard";
import Employees from "./views/employee";
import Comment from "./views/comment";
import Department from "./views/department";
import Position from "./views/position";
import AnonymousComments from "./views/anonymousComments";
<<<<<<< HEAD
import Form from "./components/StaffBiodataForm";
=======
import AppraisalQuestionsView from "./views/appraisalQuestions";
import { useMemo } from "react";
import PersonalProfile from "./views/personalProfile";
import AllAppraisal from "./views/allAppraisal";
import AppraisalDetailsAdmin from "./views/appraisalDetailsAdmin";
>>>>>>> main

// Function to check if user is authenticated
const getUser = () => {
  try {
    const storedUser = localStorage.getItem("persist:auth");
    if (!storedUser) return null;

    const parsedStorage = JSON.parse(storedUser);
    return parsedStorage?.user ? JSON.parse(parsedStorage.user) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

function App() {
  const user = useMemo(getUser, []);

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
          <Route path="profile" element={<PersonalProfile />} />
          <Route path="employees/profile/:id" element={<Profile />} />
          <Route path="appraisal" element={<Appraisal />} />
          <Route path="leave" element={<Leaves />} />
          <Route path="settings" element={<Settings />} />
          <Route path="appraisal/:id" element={<AppraisalDetails />} />
          <Route
            path="appraisal-details/:id"
            element={<AppraisalDetailsAdmin />}
          />
          <Route path="comment" element={<Comment />} />
          <Route path="employees" element={<Employees />} />
          <Route path="department" element={<Department />} />
          <Route path="position" element={<Position />} />
          <Route path="anonymous-comments" element={<AnonymousComments />} />
<<<<<<< HEAD
          <Route path="form" element={<Form />} />
=======
          <Route path="allAppraisal" element={<AllAppraisal />} />
          <Route
            path="appraisal-questions"
            element={<AppraisalQuestionsView />}
          />
>>>>>>> main
        </Route>

        {/* Auth Routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
