import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = (e) => {
    e.preventDefault();

    if (!username || !newPassword || !confirmPassword) {
      setMessage("Please fill all the fields.");
    } else if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
    } else {
      setMessage("Password successfully reset!");
      setUsername("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <h2 className="text-8xl font-dancing text-center mb-20 mt-20">Reset Password</h2>

      <div className="border-4 border-black p-6 rounded-lg shadow-lg shadow-red-500">
        <form className="space-y-4" onSubmit={handleReset}>
          <input
            type="text"
            placeholder="Username"
            className="w-full border p-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-2 rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border p-2 rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition text-lg"
          >
            Reset Password
          </button>
          <Link
            to="/login"
            className="block text-center text-lg text-blue-600 hover:underline"
          >
            Back to Login
          </Link>
        </form>
        {message && (
          <p className="mt-4 text-center text-red-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
