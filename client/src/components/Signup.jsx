import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    toast.success("Signup successful! Redirecting to marks form...", {
      position: "top-center",
      autoClose: 2000,
    });

    // Clear the form fields
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setError("");

    setTimeout(() => {
      navigate("/marksform");
    }, 1000);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <h2 className="text-8xl font-dancing mt-20 mb-20 text-center">Sign Up</h2>

      <div className="border-4 border-black p-6 rounded-lg shadow-lg shadow-red-500">
        <form onSubmit={handleSignup} className="space-y-6">
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border p-2 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition text-lg"
          >
            Sign Up
          </button>

          <Link
            to="/login"
            className="block text-center text-lg text-blue-600 hover:underline"
          >
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
