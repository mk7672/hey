import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    // Simulate successful login
    localStorage.setItem("token", "mockToken123");

    toast.success("Login successful!", {
      position: "top-center",
      autoClose: 2000,
    });

    setTimeout(() => navigate("/pl"), 1000);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <h2 className="text-8xl font-dancing mt-20 mb-20 text-center">Login</h2>

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

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition text-lg">
            Login
          </button>

          <Link
            to="/forgot-password"
            className="block text-center text-lg text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
