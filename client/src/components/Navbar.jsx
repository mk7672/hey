import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black text-white py-3">
      <div className="flex justify-center gap-6">
        <Link to="/" className="hover:underline font-semibold">Home</Link>
        <Link to="/contact" className="hover:underline font-semibold">Contact Us</Link>
        <Link to="/login" className="hover:underline font-semibold">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
