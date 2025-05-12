import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleLogoClick = () => {
    if (isLoggedIn) {
      navigate("/pl"); // logged-in landing page
    } else {
      navigate("/"); // public landing page
    }
  };

  const handleTitleClick = () => {
    if (isLoggedIn) {
      navigate("/pl");
    } else {
      navigate("/");
    }
  };

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

        <div className="flex items-center gap-20">
          <Link to="/contact" className="hover:underline font-semibold text-xl">
            Contact Us
          </Link>

          {!isLoggedIn ? (
            <Link to="/signup" className="hover:underline font-semibold text-xl">
              Sign Up
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="hover:underline font-semibold text-xl"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
