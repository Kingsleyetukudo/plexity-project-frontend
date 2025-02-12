import React, { useMemo, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// Lazy-loaded components
const Login = React.lazy(() => import("./views/login"));
const Dashboard = React.lazy(() => import("./views/Dashboard"));
const Signin = React.lazy(() => import("./views/Signin"));
const Profile = React.lazy(() => import("./views/profile"));
const Appraisal = React.lazy(() => import("./views/appraisal"));
const Leaves = React.lazy(() => import("./views/leave"));
const Settings = React.lazy(() => import("./views/settings"));
const DashboardDefault = React.lazy(() => import("./views/dashboardDefault"));
const AppraisalDetails = React.lazy(() => import("./views/appraisalDetails"));
const AdminDashboard = React.lazy(() => import("./views/AdminDashboard"));
const Employees = React.lazy(() => import("./views/employee"));
const Comment = React.lazy(() => import("./views/comment"));
const Department = React.lazy(() => import("./views/department"));
const Position = React.lazy(() => import("./views/position"));
const AnonymousComments = React.lazy(() => import("./views/anonymousComments"));
const Form = React.lazy(() => import("./components/StaffBiodataForm"));
const AppraisalQuestionsView = React.lazy(() =>
  import("./views/appraisalQuestions")
);
const PersonalProfile = React.lazy(() => import("./views/personalProfile"));
const AllAppraisal = React.lazy(() => import("./views/allAppraisal"));
const AppraisalDetailsAdmin = React.lazy(() =>
  import("./views/appraisalDetailsAdmin")
);

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
      <Suspense fallback={<div>Loading...</div>}>
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
            <Route path="form" element={<Form />} />
            <Route path="allAppraisal" element={<AllAppraisal />} />
            <Route
              path="appraisal-questions"
              element={<AppraisalQuestionsView />}
            />
          </Route>

          {/* Auth Routes */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
