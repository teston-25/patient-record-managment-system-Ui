import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import appointmentAPI from "../../../API/appointmentAPI";

// Async thunk to fetch appointments by patient ID
export const fetchPatientAppointments = createAsyncThunk(
  "patientAppointments/fetchByPatientId",
  async (patientId, { rejectWithValue }) => {
    try {
      const res = await appointmentAPI.getAppointmentsByPatient(patientId);
      return res.data.appointments;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch appointments",
      );
    }
  },
);

const patientAppointmentsSlice = createSlice({
  name: "patientAppointments",
  initialState: {
    appointments: [],
    loading: false,
    error: null,
    sidebarOpen: false,
  },
  reducers: {
    setSidebarOpen(state, action) {
      state.sidebarOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload.data || action.payload;
      })
      .addCase(fetchPatientAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selector to get appointment by ID
export const selectPatientAppointmentById = (state, id) =>
  state.patientAppointments.appointments.find((appt) => appt._id === id);

export const { setSidebarOpen } = patientAppointmentsSlice.actions;

export default patientAppointmentsSlice.reducer;
