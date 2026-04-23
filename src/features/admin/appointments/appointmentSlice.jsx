import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import appointmentsAPI from "../../../API/appointmentAPI";

// Async Thunks
export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await appointmentsAPI.getAllAppointments();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const addAppointment = createAsyncThunk(
  "appointments/addAppointment",
  async (newAppointment, { rejectWithValue }) => {
    try {
      const response = await appointmentsAPI.addAppointment(newAppointment);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const fetchTodaysAppointments = createAsyncThunk(
  "appointments/fetchTodaysAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await appointmentsAPI.getTodaysAppointments();
      return response.data;
    } catch (error) {
      if (error?.response?.status === 404) {
        return { appointments: [] };
      }
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch today's appointments",
      );
    }
  },
);

export const fetchAppointmentsByDate = createAsyncThunk(
  "appointments/fetchAppointmentsByDate",
  async (date, { rejectWithValue }) => {
    try {
      const response = await appointmentsAPI.getAppointmentsByDate(date);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const updateAppointment = createAsyncThunk(
  "appointments/updateAppointment",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const response = await appointmentsAPI.updateAppointment(id, updateData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const deleteAppointment = createAsyncThunk(
  "appointments/deleteAppointment",
  async (id, { rejectWithValue }) => {
    try {
      const response = await appointmentsAPI.deleteAppointment(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const fetchAppointmentsByPatient = createAsyncThunk(
  "appointments/fetchAppointmentsByPatient",
  async (id, { rejectWithValue }) => {
    try {
      const response = await appointmentsAPI.getAppointmentsByPatient(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// IMPROVED: fetchAppointmentById with better error handling
export const fetchAppointmentById = createAsyncThunk(
  "appointments/fetchAppointmentById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await appointmentsAPI.getAppointmentById(id);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return rejectWithValue("Appointment not found");
      }
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const clearAppointmentError = createAction("appointments/clearError");

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    todaysAppointments: [],
    patientAppointments: [],
    currentAppointment: null,
    loading: false,
    error: null,
    status: "idle",
    lastFetch: null,
  },
  reducers: {
    clearAppointments: (state) => {
      state.appointments = [];
    },
    clearTodaysAppointments: (state) => {
      state.todaysAppointments = [];
    },
    clearPatientAppointments: (state) => {
      state.patientAppointments = [];
    },
    clearCurrentAppointment: (state) => {
      state.currentAppointment = null;
    },
    resetAppointmentState: (state) => {
      state.currentAppointment = null;
      state.loading = false;
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
      state.status = "loading";
    };

    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
      state.status = "failed";
    };

    builder
      // Fetch all appointments
      .addCase(fetchAppointments.pending, handlePending)
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments =
          action.payload.appointments || action.payload || [];
        state.status = "succeeded";
        state.lastFetch = Date.now();
      })
      .addCase(fetchAppointments.rejected, handleRejected)

      // Add appointment
      .addCase(addAppointment.pending, handlePending)
      .addCase(addAppointment.fulfilled, (state, action) => {
        state.loading = false;
        const newAppointment = action.payload.appointment || action.payload;
        if (newAppointment?._id) {
          state.appointments.unshift(newAppointment);
          state.status = "succeeded";
        }
      })
      .addCase(addAppointment.rejected, handleRejected)

      // Today's appointments
      .addCase(fetchTodaysAppointments.pending, handlePending)
      .addCase(fetchTodaysAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.todaysAppointments =
          action.payload.appointments || action.payload || [];
        state.status = "succeeded";
      })
      .addCase(fetchTodaysAppointments.rejected, handleRejected)

      // Appointments by date
      .addCase(fetchAppointmentsByDate.pending, handlePending)
      .addCase(fetchAppointmentsByDate.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments =
          action.payload.appointments || action.payload || [];
        state.status = "succeeded";
      })
      .addCase(fetchAppointmentsByDate.rejected, handleRejected)

      // Update appointment
      .addCase(updateAppointment.pending, handlePending)
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.loading = false;
        const updatedAppointment = action.payload.appointment || action.payload;
        const index = state.appointments.findIndex(
          (appt) => appt._id === updatedAppointment._id,
        );
        if (index !== -1) {
          state.appointments[index] = updatedAppointment;
        }
        // Also update currentAppointment if it's the same
        if (state.currentAppointment?._id === updatedAppointment._id) {
          state.currentAppointment = updatedAppointment;
        }
        state.status = "succeeded";
      })
      .addCase(updateAppointment.rejected, handleRejected)

      // Delete appointment
      .addCase(deleteAppointment.pending, handlePending)
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId =
          action.payload?._id ||
          action.payload?.appointment?._id ||
          action.meta.arg;

        if (deletedId) {
          state.appointments = state.appointments.filter(
            (appt) => appt._id !== deletedId,
          );
          // Clear currentAppointment if it was deleted
          if (state.currentAppointment?._id === deletedId) {
            state.currentAppointment = null;
          }
        }
        state.status = "succeeded";
      })
      .addCase(deleteAppointment.rejected, handleRejected)

      // Appointments by patient
      .addCase(fetchAppointmentsByPatient.pending, handlePending)
      .addCase(fetchAppointmentsByPatient.fulfilled, (state, action) => {
        state.loading = false;
        const appointments = action.payload.appointments || action.payload;
        state.patientAppointments = Array.isArray(appointments)
          ? appointments
          : [appointments];
        state.status = "succeeded";
      })
      .addCase(fetchAppointmentsByPatient.rejected, handleRejected)

      // IMPROVED: Single appointment by ID
      .addCase(fetchAppointmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(fetchAppointmentById.fulfilled, (state, action) => {
        state.loading = false;
        // Handle different response structures
        const appointment =
          action.payload.appointment ||
          action.payload.data?.appointment ||
          action.payload;

        state.currentAppointment = appointment;
        state.status = "succeeded";

        // Optional: Update in appointments array if exists
        if (appointment?._id) {
          const index = state.appointments.findIndex(
            (a) => a._id === appointment._id,
          );
          if (index !== -1) {
            state.appointments[index] = appointment;
          }
        }
      })
      .addCase(fetchAppointmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.currentAppointment = null;
        state.status = "failed";
      });
  },
});

// Enhanced selectors
export const selectAppointmentById = (state, id) => {
  // First check currentAppointment
  if (state.appointments.currentAppointment?._id === id) {
    return state.appointments.currentAppointment;
  }
  // Then check appointments array
  return state.appointments.appointments.find((appt) => appt._id === id);
};

export const selectAppointmentStatus = (state) => ({
  loading: state.appointments.loading,
  error: state.appointments.error,
  status: state.appointments.status,
});

export const {
  clearAppointments,
  clearTodaysAppointments,
  clearPatientAppointments,
  clearCurrentAppointment,
  resetAppointmentState,
} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
