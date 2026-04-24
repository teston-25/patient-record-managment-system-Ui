import api from "../services/axios";

const authAPI = {
  login: async (email, password) => {
    const response = await api.post("/auth/signin", { email, password });
    return response.data;
  },

  signup: async (userData) => {
    const response = await api.post("/auth/signup", userData);
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  resetPassword: async (token, newPassword) => {
    const response = await api.patch(`/api/auth/reset-password/${token}`, {
      password: newPassword,
      confirmPassword: newPassword,
    });
    return response.data;
  },

  updatePassword: async (passwordData) => {
    const response = await api.patch("/api/auth/update-password", passwordData);
    return response.data;
  },
};

export const { login, signup, forgotPassword, resetPassword, updatePassword } =
  authAPI;
export default authAPI;
