import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthCard from "../../../components/forms/AuthCard";
import authAPI from "../../../API/authAPI";
import toast from "react-hot-toast";
import { FaHome, FaEye, FaEyeSlash } from "react-icons/fa";
import { setLoading, setError, resetPasswordSuccess } from "../authSlice";

export default function ResetPass() {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    password: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = async (e) => {
    e.preventDefault();

    // 1. Basic validation
    if (formData.password !== formData.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    dispatch(setLoading(true));

    try {
      const res = await authAPI.resetPassword(
        token,
        formData.password,
        formData.confirm,
      );

      // 2. Safe access to message
      const successMsg =
        res?.data?.message || res?.message || "Password successfully reset!";

      dispatch(resetPasswordSuccess(successMsg));
      toast.success(successMsg);

      // 3. Navigate away after success
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      // 4. Safe access to error message
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Reset failed. Please try again.";

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
        title="Reset Password"
        // Use Redux loading state for the button
        buttonText={loading ? "Updating..." : "Submit New Password"}
        onSubmit={handleReset}
      >
        <div className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="New Password"
              className="w-full px-4 py-2 pr-10 border border-teal-200 rounded-md focus:ring-2 focus:ring-[#007c80] focus:border-transparent outline-none transition"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-[#007c80] transition-colors"
            >
              {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </button>
          </div>

          <input
            type="password"
            name="confirm"
            placeholder="Confirm New Password"
            className="w-full px-4 py-2 border border-teal-200 rounded-md focus:ring-2 focus:ring-[#007c80] focus:border-transparent outline-none transition"
            value={formData.confirm}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>
      </AuthCard>
    </div>
  );
}
