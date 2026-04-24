import api from "../services/axios";

// Get current user's profile
export const getProfile = async () => {
  const res = await api.get("/profile/me");
  return res.data;
};

// Update current user's profile
export const updateProfile = async (data) => {
  const res = await api.patch("/profile/me", data);
  return res.data;
};

export default { getProfile, updateProfile };
