import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthCard from "../../../components/forms/AuthCard";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login, setLoading, setError } from "../authSlice";
import authAPI from "../../../API/authAPI";
import { FaHome, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    const normalizedEmail = formData.email.trim().toLowerCase();
    dispatch(setLoading(true));

    try {
      const data = await authAPI.login(normalizedEmail, formData.password);

      dispatch(login(data));
      localStorage.setItem("token", data.token);
      toast.success(data.message || "Login successful!");

      // Redirect based on user role
      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (data.user.role === "staff") {
        navigate("/staff/dashboard");
      } else if (data.user.role === "doctor") {
        navigate("/doctor/dashboard");
      } else if (data.user.role === "user") {
        navigate("/patient/dashboard");
      } else {
        navigate("/profile"); // fallback
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      dispatch(setError(errorMessage));
      toast.error(errorMessage || "Login failed. Please try again.");
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
        title="Welcome Back"
        buttonText="Log In"
        onSubmit={handleLogin}
        footer={
          <p className="text-sm mt-4 text-center text-[#0f5d5f]">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-[#007c80] hover:text-teal-700 hover:underline"
            >
              Sign up
            </Link>
          </p>
        }
      >
        <div className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-teal-200 rounded-md focus:ring-2 focus:ring-[#007c80] focus:border-transparent outline-none transition"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 pr-10 border border-teal-200 rounded-md focus:ring-2 focus:ring-[#007c80] focus:border-transparent outline-none transition"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </button>
          </div>

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-[#007c80] hover:text-teal-700 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
