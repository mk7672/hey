import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
      <form className="space-y-4">
        <input type="email" placeholder="Enter your email" className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-black text-white py-2 rounded">Send Reset Link</button>
        <Link to="/login" className="block text-center text-sm text-blue-600 hover:underline">
          Back to Login
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
