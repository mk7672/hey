// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import Contact from "./components/Contact";
// import Login from "./components/Login";
// import ForgotPassword from "./components/ForgotPassword";
// import PostLoginHome from "./components/PostLoginHome";
// import MarksForm from './components/MarksForm'; 
// import { ToastContainer } from "react-toastify";

// const App = () => {
//   return (
//     <Router>
//        <ToastContainer />
//       <Routes>
//         <Route path="/*" element={<AppRoutes />} />
//       </Routes>
//     </Router>
//   );
// };

// const AppRoutes = () => {
//   const location = useLocation(); // Get current route

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Conditionally render Navbar */}
//       {location.pathname !== '/home' && <Navbar />} {/* Hide navbar on /home */}

//       <div className="flex justify-center items-center py-10">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/home" element={<PostLoginHome />} /> {/* Route for the post-login home page */}
//           <Route path="/marks-form" element={<MarksForm />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default App;

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import PostLoginHome from "./components/PostLoginHome";
import MarksForm from "./components/MarksForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentMarksTable from "./components/Stable";

const AppLayout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/home";

  return (
    <div className="min-h-screen bg-gray-100">
      {!hideNavbar && <Navbar />}

      <div className="flex justify-center items-center py-10">
        {children}
      </div>

      {/* Move ToastContainer here */}
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
          path="/contact"
          element={
            <AppLayout>
              <Contact />
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
        <Route path="/pl" element={<PostLoginHome />} />
        <Route
          path="/marks-form/:type"
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
