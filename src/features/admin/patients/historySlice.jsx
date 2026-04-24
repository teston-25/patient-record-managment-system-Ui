import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMedicalHistory,
  addMedicalHistory,
  updateMedicalHistory,
  deleteMedicalHistory,
} from "../../../API/historyAPI";

// Fetch all history for a patient
export const fetchHistory = createAsyncThunk(
  "history/fetchHistory",
  async (patientId, { rejectWithValue }) => {
    try {
      const res = await getMedicalHistory(patientId);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

// Add new history entry for a patient
export const createHistory = createAsyncThunk(
  "history/createHistory",
  async ({ patientId, data }, { rejectWithValue }) => {
    try {
      const res = await addMedicalHistory(patientId, {
        ...data,
        patient: patientId,
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

// Update a history entry
export const editHistory = createAsyncThunk(
  "history/editHistory",
  async ({ historyId, data }, { rejectWithValue }) => {
    try {
      const res = await updateMedicalHistory(historyId, data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

// Delete a history entry
export const removeHistory = createAsyncThunk(
  "history/removeHistory",
  async ({ historyId }, { rejectWithValue }) => {
    try {
      await deleteMedicalHistory(historyId);
      return historyId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

const historySlice = createSlice({
  name: "history",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearHistoryState: (state) => {
      state.list = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add
      .addCase(createHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(editHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editHistory.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.list.findIndex((h) => h._id === action.payload._id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(editHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(removeHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((h) => h._id !== action.payload);
      })
      .addCase(removeHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearHistoryState } = historySlice.actions;
export default historySlice.reducer;
