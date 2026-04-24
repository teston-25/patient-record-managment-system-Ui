import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reportsAPI from "../../../API/reportAPI";

export const fetchSummaryReport = createAsyncThunk(
  "reports/fetchSummaryReport",
  async (_, { rejectWithValue }) => {
    try {
      return await reportsAPI.getSummaryReport();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch summary report",
      );
    }
  },
);

export const fetchAppointmentsByDateRange = createAsyncThunk(
  "reports/fetchAppointmentsByDateRange",
  async ({ from, to }, { rejectWithValue }) => {
    try {
      return await reportsAPI.getAppointmentsByDateRange(from, to);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch appointments",
      );
    }
  },
);

export const fetchFrequentDiagnoses = createAsyncThunk(
  "reports/fetchFrequentDiagnoses",
  async (_, { rejectWithValue }) => {
    try {
      return await reportsAPI.getFrequentDiagnoses();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch frequent diagnoses",
      );
    }
  },
);

const reportSlice = createSlice({
  name: "reports",
  initialState: {
    summary: null,
    appointments: [],
    diagnoses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSummaryReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSummaryReport.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload.data; // store only the .data object
      })
      .addCase(fetchSummaryReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAppointmentsByDateRange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointmentsByDateRange.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload.appointments;
      })
      .addCase(fetchAppointmentsByDateRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFrequentDiagnoses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFrequentDiagnoses.fulfilled, (state, action) => {
        state.loading = false;
        state.diagnoses = action.payload.topDiagnoses; // store only the array
      })
      .addCase(fetchFrequentDiagnoses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reportSlice.reducer;
