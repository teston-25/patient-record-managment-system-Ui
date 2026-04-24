import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile } from "./settingSlice";
import Spinner from "../../../components/common/Spinner";
import ErrorMessage from "../../../components/common/ErrorMessage";
import {
  FaUser,
  FaLock,
  FaSave,
  FaEye,
  FaEyeSlash,
  FaUserCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";

function Settings() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector(
    (state) => state.settings || {},
  );

  const { user } = useSelector((state) => state.auth);

  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    role: "",
    status: "",
    createdAt: "",
    updatedAt: "",
  });

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    password: "",
    confirm: "",
  });
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Load profile from Redux only
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchProfile(user.id));
    }
  }, [dispatch, user?.id]);

  // Update form when profile data arrives
  useEffect(() => {
    if (profile) {
      setProfileForm({
        firstName: profile.firstName || profile.fullName?.split(" ")[0] || "",
        lastName:
          profile.lastName ||
          profile.fullName?.split(" ").slice(1).join(" ") ||
          "",
        fullName: profile.fullName || "",
        email: profile.email || "",
        role: profile.role || "",
        status: profile.status || "",
        createdAt: profile.createdAt || "",
        updatedAt: profile.updatedAt || "",
      });
    }
  }, [profile]);

  // Handle profile update - Redux will handle persistence
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const submitData = {
        ...profileForm,
        fullName:
          profileForm.firstName && profileForm.lastName
            ? `${profileForm.firstName} ${profileForm.lastName}`.trim()
            : profileForm.fullName,
      };
      await dispatch(updateProfile(submitData)).unwrap();
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setProfileLoading(false);
    }
  };

  // Profile form handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  // Password form handlers
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    if (passwordForm.password !== passwordForm.confirm) {
      setPasswordError("Passwords do not match");
      return;
    }
    if (passwordForm.password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    setPasswordLoading(true);
    try {
      await dispatch(
        updateProfile({
          ...profileForm,
          password: passwordForm.password,
          oldPassword: passwordForm.oldPassword,
        }),
      );
      toast.success("Password updated successfully");
      setPasswordForm({ oldPassword: "", password: "", confirm: "" });
    } finally {
      setPasswordLoading(false);
    }
  };

  // Add loading state check
  if (loading && !profile) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center justify-center bg-gradient-to-br from-[#007c80] to-teal-600 rounded-full w-20 h-20 mb-4">
              <FaUserCircle className="text-white text-5xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Profile Settings
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Manage your account information
            </p>
          </div>

          <div className="space-y-6">
            {/* Profile Information Section */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-teal-100">
                <FaUser className="text-[#007c80] text-sm" />
                <h3 className="text-md font-semibold text-gray-700">
                  Profile Information
                </h3>
                {profileLoading && <Spinner />}
              </div>

              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={profileForm.firstName}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-teal-200 rounded-md focus:ring-2 focus:ring-[#007c80] focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={profileForm.lastName}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 border border-teal-200 rounded-md focus:ring-2 focus:ring-[#007c80] focus:border-transparent outline-none transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 border border-teal-200 rounded-md focus:ring-2 focus:ring-[#007c80] focus:border-transparent outline-none transition"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      value={
                        profileForm.role
                          ? profileForm.role.charAt(0).toUpperCase() +
                            profileForm.role.slice(1)
                          : "N/A"
                      }
                      className="w-full px-4 py-2 border border-teal-200 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
                      readOnly
                      placeholder="Role"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={
                        profileForm.status
                          ? profileForm.status.charAt(0).toUpperCase() +
                            profileForm.status.slice(1)
                          : "Active"
                      }
                      className="w-full px-4 py-2 border border-teal-200 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
                      readOnly
                      placeholder="Status"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#007c80] hover:bg-teal-700 text-white font-semibold py-2 rounded-md transition duration-200 flex items-center justify-center gap-2"
                  disabled={profileLoading}
                >
                  <FaSave className="text-sm" />
                  Save Profile
                </button>
              </form>
            </div>

            {/* Password Change Section */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-teal-100">
                <FaLock className="text-[#007c80] text-sm" />
                <h3 className="text-md font-semibold text-gray-700">
                  Change Password
                </h3>
                {passwordLoading && <Spinner />}
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type={showPasswords ? "text" : "password"}
                    name="oldPassword"
                    placeholder="Current Password"
                    value={passwordForm.oldPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 pr-10 border border-teal-200 rounded-md focus:ring-2 focus:ring-[#007c80] focus:border-transparent outline-none transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords((v) => !v)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords ? (
                      <FaEyeSlash size={16} />
                    ) : (
                      <FaEye size={16} />
                    )}
                  </button>
                </div>

                <div>
                  <input
                    type={showPasswords ? "text" : "password"}
                    name="password"
                    placeholder="New Password"
                    value={passwordForm.password}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-teal-200 rounded-md focus:ring-2 focus:ring-[#007c80] focus:border-transparent outline-none transition"
                    required
                  />
                </div>

                <div>
                  <input
                    type={showPasswords ? "text" : "password"}
                    name="confirm"
                    placeholder="Confirm New Password"
                    value={passwordForm.confirm}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-teal-200 rounded-md focus:ring-2 focus:ring-[#007c80] focus:border-transparent outline-none transition"
                    required
                  />
                </div>

                {passwordError && (
                  <div className="text-red-500 text-sm">{passwordError}</div>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#007c80] hover:bg-teal-700 text-white font-semibold py-2 rounded-md transition duration-200 flex items-center justify-center gap-2"
                  disabled={passwordLoading}
                >
                  <FaLock className="text-sm" />
                  Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
