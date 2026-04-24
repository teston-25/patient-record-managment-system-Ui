import axios from "axios";

// Environment-based configuration
const getBaseURL = () => {
  if (import.meta.env.DEV) {
    // In development, use the proxy
    return "/api";
  }
  // In production, use the direct URL
  return "https://prms-backend-rrdo.onrender.com/api";
  // return "http://localhost:5000/";
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
  timeout: 10000, // 10 second timeout
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle CORS errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 0 || error.code === "ERR_NETWORK") {
      console.error(
        "CORS Error: Unable to connect to the server. Please check if the backend is running and CORS is properly configured.",
      );
    }
    return Promise.reject(error);
  },
);

export default api;
