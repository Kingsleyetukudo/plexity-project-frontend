import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./views/login";
import Dashboard from "./views/Dashboard";
import Signin from "./views/Signin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
