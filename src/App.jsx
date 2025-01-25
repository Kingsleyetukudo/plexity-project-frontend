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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardDefault />} />

          <Route path="profile" element={<Profile />} />
          <Route path="appraisal" element={<Appraisal />} />
          <Route path="leave" element={<Leaves />} />
          <Route path="settings" element={<Settings />} />
          <Route path="goals" element={<Goals />} />
          <Route path="appraisal/:id" element={<AppraisalDetails />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
