import { useState } from "react";
import { Link } from "react-router-dom";
import AuthCard from "../../../components/forms/AuthCard";
import authAPI from "../../../API/authAPI";
import toast from "react-hot-toast";
import { FaHome } from "react-icons/fa";
import { forgotPasswordSuccess, setLoading, setError } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
// import { set } from "react-hook-form";

export default function ForgotPass() {
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    dispatch(setLoading(true));

    try {
      const res = await authAPI.forgotPassword(normalizedEmail);

      // SAFE ACCESS: Check if res and res.data exist before grabbing message
      const successMsg =
        res?.data?.message || res?.message || "Reset link sent!";

      dispatch(forgotPasswordSuccess(successMsg));
      toast.success(successMsg);
      setEmail("");
    } catch (err) {
      // SAFE ACCESS: Handle errors safely too
      const errorMsg =
        err.response?.data?.message || err.message || "An error occurred";

      dispatch(setError(errorMsg));
      toast.error(errorMsg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-teal-100 to-[#c8ffff] flex items-center justify-center relative p-4">
      <Link
        to="/"
        className="absolute top-6 right-6 text-[#007c80] text-2xl hover:text-teal-700 transition"
        title="Back to Home"
      >
        <FaHome size={24} />
      </Link>

      <AuthCard
        title="Forgot Password"
        buttonText={loading ? "Sending..." : "Send Reset Link"}
        onSubmit={handleForgotPassword}
        footer={
          <p className="text-sm mt-4 text-center text-[#0f5d5f]">
            Remember your password?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#007c80] hover:text-teal-700 hover:underline"
            >
              Back to Login
            </Link>
          </p>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-center text-[#0f5d5f] mb-2">
            Enter your email address and we’ll send you a reset link.
          </p>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border border-teal-200 rounded-md focus:ring-2 focus:ring-[#007c80] focus:border-transparent outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </AuthCard>
    </div>
  );
}
