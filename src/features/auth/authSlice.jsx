import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
  // Optional: Add a success message state for forgot/reset feedback
  statusMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.error = null; // Clear errors on success

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },

    signup(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.error = null;
    },

    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.statusMessage = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.statusMessage = action.payload;
      state.error = null;
    },

    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.statusMessage = action.payload;
      state.error = null;
    },

    setLoading(state, action) {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
        state.statusMessage = null;
      }
    },

    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    clearStatus(state) {
      state.error = null;
      state.statusMessage = null;
    },
  },
});

export const {
  login,
  signup,
  logout,
  setLoading,
  setError,
  forgotPasswordSuccess,
  resetPasswordSuccess,
  clearStatus,
} = authSlice.actions;

export default authSlice.reducer;
