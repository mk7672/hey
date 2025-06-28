import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Hardcoded valid credentials (replace with your actual values)
const VALID_USERNAME = "aaa";
const VALID_PASSWORD = "11111";

// Mock function to generate a JWT token string
const generateMockJWT = (username) => {
  // Normally JWT comes from your backend after authentication.
  // Here we'll just encode username with a dummy token for demo
  return btoa(JSON.stringify({ username, exp: Date.now() + 3600 * 1000 })); // base64 string
};

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

    // Check credentials against the single valid user
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      // Generate and store JWT token in localStorage
      const token = generateMockJWT(username);
      localStorage.setItem("token", token);

      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => navigate("/pl"), 1000);
    } else {
      setError("Invalid credentials.");
    }
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

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition text-lg"
          >
            Login
          </button>

        
        </form>
      </div>
    </div>
  );
};

export default Login;
