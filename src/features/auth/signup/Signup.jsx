import { useState } from "react";
import toast from "react-hot-toast";
import AuthCard from "../../../components/forms/AuthCard";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup, setLoading, setError } from "../authSlice";
import { FaHome } from "react-icons/fa";
import authAPI from "../../../API/authAPI";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    const { fullName, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      dispatch(setLoading(false));
      return;
    }

    try {
      const data = await authAPI.signup({ fullName, email, password });

      dispatch(
        signup({
          user: data.user,
          token: data.token,
          role: data.role,
        }),
      );

      localStorage.setItem("token", data.token);

      toast.success("Signup successful: " + (data.message || "Welcome!"));

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/profile");
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      dispatch(setError(errorMsg));
      toast.error("Signup failed: " + errorMsg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-teal-100 to-[#ddfbfb] flex items-center justify-center relative p-4">
      <Link
        to="/"
        className="absolute top-6 right-6 text-[#007c80] text-2xl hover:text-teal-700 transition"
        title="Back to Home"
      >
        <FaHome size={24} />
      </Link>

      <AuthCard
        title="Create an Account"
        buttonText="Sign Up"
        onSubmit={handleSignup}
        footer={
          <p className="text-sm mt-4 text-center text-[#0f5d5f]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#007c80] hover:text-teal-700 hover:underline"
            >
              Log in
            </Link>
          </p>
        }
      >
        <div className="space-y-4">
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-teal-200 rounded-md focus:ring-2 focus:ring-[#007c80] focus:border-transparent outline-none transition"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-teal-200 rounded-md focus:ring-2 focus:ring-[#007c80] focus:border-transparent outline-none transition"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password (min 8 characters)"
              className="w-full px-4 py-2 border border-teal-200 rounded-md focus:ring-2 focus:ring-[#007c80] focus:border-transparent outline-none transition"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              required
            />
          </div>

          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border border-teal-200 rounded-md focus:ring-2 focus:ring-[#007c80] focus:border-transparent outline-none transition"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
