import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userAPI from "../../../API/userAPI";
import authAPI from "../../../API/authAPI";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await userAPI.getAllUsers();
  return response.data.users;
});

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await userAPI.getUserById(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await userAPI.updateUserRole(id, updatedData);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await userAPI.deleteUser(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const addNewUser = createAsyncThunk(
  "users/addNewUser",
  async (userData) => {
    const response = await authAPI.signup(userData);
    console.log("response addNewUser:", response);
    return response;
  },
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
    filter: "all",
    searchTerm: "",
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    resetUserState: (state) => {
      state.loading = "idle";
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updated = action.payload.user || action.payload;
        const existingUser = state.users.find(
          (user) => user._id === updated._id,
        );
        if (existingUser) {
          existingUser.role = updated.role;
          existingUser.active = updated.active;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export const { setFilter, setSearchTerm, resetUserState } = userSlice.actions;

export const selectAllUsers = (state) => state.users.users;
export const selectFilteredUsers = (state) => {
  const { users, filter, searchTerm } = state.users;
  let filteredUsers = users;

  if (filter !== "all") {
    filteredUsers = filteredUsers.filter((user) => user.role === filter);
  }

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.fullName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term),
    );
  }

  return filteredUsers;
};

export const selectUserStatus = (state) => state.users.status;
export const selectUserError = (state) => state.users.error;

export default userSlice.reducer;
