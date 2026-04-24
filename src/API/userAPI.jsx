import api from "../services/axios";

const userAPI = {
  // GET /users (admin, staff)
  getAllUsers: async () => {
    const response = await api.get("/users");
    return response.data;
  },
  // GET /users (admin, staff)
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // PATCH /users/:id (admin)
  updateUserRole: async (id, updatedData) => {
    const response = await api.patch(`/users/${id}`, updatedData);
    console.log("response updateUser:", response);
    return response.data;
  },

  // DELETE /users/:id (admin)
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};

export default userAPI;
