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

  return (
    <nav className="bg-gradient-to-r from-red-500 to-black text-white py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="flex items-center gap-4">
          <Link to="/">
            <img
              src="./exam-logo.jpg"
              alt="Logo"
              className="w-12 h-12 rounded-full hover:scale-110 transition-transform"
            />
          </Link>
          <Link to="/">
            <div className="text-xl font-serif font-semibold hover:underline">S E C</div>
          </Link>
        </div>

        <div className="flex items-center gap-8">
          <Link to="/contact" className="hover:underline font-semibold">
            Contact Us
          </Link>

          {!isLoggedIn ? (
            <Link to="/login" className="hover:underline font-semibold">
              Login
            </Link>
          ) : (
            <>
              <Link to="/" className="hover:underline font-semibold">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="hover:underline font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
