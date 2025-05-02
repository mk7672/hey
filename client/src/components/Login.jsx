import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Faculty Login</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Username" className="w-full border p-2 rounded" />
        <input type="password" placeholder="Password" className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-black text-white py-2 rounded">Login</button>
        <Link to="/forgot-password" className="block text-center text-sm text-blue-600 hover:underline">
          Forgot Password?
        </Link>
      </form>
    </div>
  );
};

export default Login;
