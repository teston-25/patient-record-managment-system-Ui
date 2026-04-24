import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appointmentAPI from "../../../API/appointmentAPI";

export const fetchDoctorDashboardStats = createAsyncThunk(
  "docDashboard/fetchStats",
  async (_, thunkAPI) => {
    try {
      // Fetch doctor-specific appointments and today's appointments
      const [appointmentsRes, todaysAppointmentsRes] = await Promise.all([
        appointmentAPI.getMyAppointments(),
        appointmentAPI.getTodaysMyAppointments(),
      ]);

      // Defensive checks for appointments
      const allAppointments =
        appointmentsRes.data?.appointments ||
        appointmentsRes.appointments ||
        appointmentsRes.data ||
        appointmentsRes ||
        [];
      const todaysAppointments =
        todaysAppointmentsRes.data?.appointments ||
        todaysAppointmentsRes.appointments ||
        todaysAppointmentsRes.data ||
        todaysAppointmentsRes ||
        [];

      return {
        totalAppointments: allAppointments.length,
        todaysAppointments: todaysAppointments.length,
        recentAppointments: allAppointments.slice(-3),
      };
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch doctor dashboard stats.";
      return thunkAPI.rejectWithValue(msg);
    }
  },
);

const docDashboardSlice = createSlice({
  name: "docDashboard",
  initialState: {
    loading: false,
    error: null,
    stats: {
      totalAppointments: 0,
      todaysAppointments: 0,
      recentAppointments: [],
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDoctorDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default docDashboardSlice.reducer;
