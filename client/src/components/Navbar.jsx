import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/"); // always home page
  };

  const handleTitleClick = () => {
    navigate("/"); // always home page
  };

  // List of paths where you want to hide the tabs
  const hideLinksOnPaths = ["/pl"];

  // Check if current path is in that list
  const hideTabs = hideLinksOnPaths.includes(location.pathname);

  return (
    <nav className="bg-gradient-to-r from-red-500 to-black text-white py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="flex items-center gap-4">
          <div onClick={handleLogoClick} className="cursor-pointer">
            <img
              src="./exam-logo.jpg"
              alt="Logo"
              className="w-12 h-12 rounded-full hover:scale-110 transition-transform"
            />
          </div>
          <div
            onClick={handleTitleClick}
            className="text-xl font-serif font-semibold hover:underline cursor-pointer"
          >
            S E C
          </div>
        </div>

        {/* Only hide the Contact Us and Sign Up tabs, keep logo & title active */}
        {!hideTabs && (
          <div className="flex items-center gap-20">
            <button
              onClick={handleLogout}
              className="hover:underline font-semibold text-xl"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
