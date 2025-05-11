import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-red-500 to-black text-white py-3">
      <div className="flex items-center gap-4 px-4">
        <Link to="/"><img src="./exam-logo.jpg" alt="Blue Eyes" className="w-12 h-12 rounded-full hover:scale-110" /></Link>
        <Link><div className="text-xl font-serif font-semibold hover:underline">S E C</div></Link>
      </div>
      <div className="container mx-auto flex justify-end items-center gap-8 px-8">
        {/* <Link to="/" className="hover:underline font-semibold">Home</Link> */}
        <Link to="/contact" className="hover:underline font-semibold">Contact Us</Link>
        <Link to="/login" className="hover:underline font-semibold">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;

