import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="text-white py-3"
      style={{
        background: "linear-gradient(135deg, red, black)",
      }}
    >
      <div className="container mx-auto flex justify-end gap-10 px-8">
        <Link to="/" className="hover:underline font-semibold">Home</Link>
        <Link to="/contact" className="hover:underline font-semibold">Contact Us</Link>
        <Link to="/login" className="hover:underline font-semibold">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;

