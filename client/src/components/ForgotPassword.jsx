import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="w-full max-w-sm mx-auto px-4">
      {/* Heading outside the box */}
      <h2 className="text-6xl font-dancing text-center mb-10 mt-20">Reset Password</h2>

      {/* Form box with thick border */}
      <div className="border-4 border-black p-6 rounded-lg shadow-lg shadow-red-500">
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded"
          >
            Send Reset Link
          </button>
          <Link
            to="/login"
            className="block text-center text-sm text-blue-600 hover:underline"
          >
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

