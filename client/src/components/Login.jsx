import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-full max-w-sm mx-auto px-4">
      {/* Heading outside the container */}
      <h2 className="text-7xl font-dancing mb-10 mt-20 text-center">Login</h2>

      {/* Container with thick black border */}
      <div className="border-4 border-black p-6 rounded-lg shadow-lg shadow-red-500">
        <form className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            className="w-full border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded"
          >
            Login
          </button>
          <Link
            to="/forgot-password"
            className="block text-center text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
