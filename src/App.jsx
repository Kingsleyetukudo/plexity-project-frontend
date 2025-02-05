import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  // Get user info from localStorage (could be from context or state as well)
  // const user = JSON.parse(localStorage.getItem("persist:auth"));
  // const userDetails = JSON.parse(user.user);
  // const isUserApproved = userDetails.isApproved;
  // const userRole = userDetails.role;

  // console.log(userDetails);

  // // Redirect to login if the user is not approved and tries to access protected routes
  // if (user && !isUserApproved) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <Router>
      <Routes>
        {/* Admin dashboard route */}

        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* Regular dashboard route */}

        <Route path="/dashboard" element={<Dashboard />}>
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

        {/* Other routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
