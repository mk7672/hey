import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import PostLoginHome from "./components/PostLoginHome";
import MarksForm from './components/MarksForm'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AppRoutes />} />
      </Routes>
    </Router>
  );
};

const AppRoutes = () => {
  const location = useLocation(); // Get current route

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Conditionally render Navbar */}
      {location.pathname !== '/dashboard' && <Navbar />} {/* Hide navbar on /dashboard */}

      <div className="flex justify-center items-center py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<PostLoginHome />} /> {/* Route for the post-login home page */}
          <Route path="/marks-form" element={<MarksForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
