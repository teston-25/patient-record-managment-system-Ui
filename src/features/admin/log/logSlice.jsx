import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import auditLogAPI from "../../../API/accesLogAPI";

export const fetchAuditLogs = createAsyncThunk(
  "logs/fetchAuditLogs",
  async ({ page = 1, limit = 20 } = {}, thunkAPI) => {
    try {
      const response = await auditLogAPI.getAuditLogs(page, limit);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch audit logs",
      );
    }
  },
);

export const fetchFilteredAuditLogs = createAsyncThunk(
  "logs/fetchFilteredAuditLogs",
  async ({ filters, page, limit }, thunkAPI) => {
    try {
      const res = await auditLogAPI.getFilteredAuditLogs(filters, page, limit);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch filtered audit logs",
      );
    }
  },
);

const logSlice = createSlice({
  name: "logs",
  initialState: {
    logs: [],
    pagination: {
      totalLogs: 0,
      totalPages: 1,
      currentPage: 1,
      limit: 20,
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuditLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuditLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload.data || [];
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAuditLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFilteredAuditLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredAuditLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload.data || action.payload.logs || [];
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchFilteredAuditLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default logSlice.reducer;
