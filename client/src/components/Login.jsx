import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy login validation (you can replace this later)
    if (username.trim() && password.trim()) {
      navigate("/dashboard"); // Redirect after login
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto px-4">
      {/* Heading outside the container */}
      <h2 className="text-7xl font-dancing mb-10 mt-20 text-center">Login</h2>

      {/* Container with thick black border */}
      <div className="border-4 border-black p-6 rounded-lg shadow-lg shadow-red-500">
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            className="w-full border p-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
