import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getProfile } from "../API/profileAPI";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout successful!");
    navigate("/");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to load profile", err);
        handleLogout();
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-800">User Profile</h2>
          <button
            onClick={handleLogout}
            className="text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>

        <div className="space-y-4 text-gray-700">
          <div>
            <span className="font-semibold">Full Name:</span> {user.fullName}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {user.email}
          </div>
          <div>
            <span className="font-semibold">Role:</span> {user.role}
          </div>
          <div>
            <span className="font-semibold">User ID:</span> {user._id}
          </div>
        </div>
      </div>
    </div>
  );
}
