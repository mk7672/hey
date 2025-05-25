import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import PostLoginHome from "./components/Postloginhome";
import MarksForm from "./components/MarksForm";
import StudentMarksTable from "./components/Stable";
import Signup from "./components/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout component to handle common UI (like Navbar)
const AppLayout = ({ children }) => {
  const location = useLocation();

  // Define paths where Navbar should be hidden
  const hideNavbarPaths = ["/dashboard"];
  const hideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-100">
      {!hideNavbar && <Navbar />}

      <div className="flex justify-center items-center py-10">
        {children}
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout>
              <Home />
            </AppLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AppLayout>
              <Signup />
            </AppLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <AppLayout>
              <Contact />
            </AppLayout>
          }
        />
        <Route
  path="/marksform"
  element={
    <AppLayout>
      <MarksForm />
    </AppLayout>
  }
/>
        <Route
          path="/login"
          element={
            <AppLayout>
              <Login />
            </AppLayout>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <AppLayout>
              <ForgotPassword />
            </AppLayout>
          }
        />
        <Route
          path="/dashboard"
          element={<PostLoginHome />} // No Navbar
        />
        <Route
          path="/marks-form/:type"
          element={
            <AppLayout>
              <MarksForm />
            </AppLayout>
          }
        />
        <Route
          path="/pl"
          element={
            <AppLayout>
              <MarksForm />
            </AppLayout>
          }
        />
        <Route
          path="/table"
          element={
            <AppLayout>
              <StudentMarksTable />
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
